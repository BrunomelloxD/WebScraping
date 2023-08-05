import { Request, Response } from 'express'
import { chromium } from 'playwright'

class InstagramScrapingController {
    async instagramFollowers(request: Request, response: Response) {
        try {
            const { url } = request.body

            const loginUrl = process.env.INSTAGRAM_LOGIN_URL as string
            const email = process.env.EMAIL
            const password = process.env.PASSWORD

            if (!email || !password) {
                return response.status(500).json({
                    error: 'Login credentials not found'
                })
            }

            // Sem navegador
            // const browser = await chromium.launch()
            // Navegador irá abrir para acompanhar o procedimento "{ headless: false }"
            const browser = await chromium.launch({ headless: false })
            const context = await browser.newContext()
            const page = await context.newPage()

            // Navegar para a página de login e preencher os campos de e-mail e senha
            await page.goto(loginUrl)
            await page.fill('input[name="username"]', email)
            await page.fill('input[name="password"]', password)

            // Clicar no botão de login
            await page.click('button[type="submit"]')

            // Aguardar até que a navegação após o login seja concluída
            await page.waitForLoadState('networkidle')

            // Navegar para a página de dados após o login
            await page.goto(url)

            // Esperar o iframe ser carregado
            await page.waitForLoadState('networkidle')

            // Obter o iframe
            const frame = page.frame({ url: url })

            if (!frame) {
                return response.status(500).json({ error: 'iframe not found.' })
            }

            await frame.waitForSelector('span._aacl')

            let previousElements: (string | null)[] = []
            let attempts = 0

            while (true) {
                const elements = await frame.$$('span._aacl')
                const texts = await Promise.all(
                    elements.map(element => element.textContent())
                )

                if (texts.length === previousElements.length) {
                    // Se não houver mais elementos carregados, verificar se as tentativas máximas foram atingidas
                    if (attempts >= 2) {
                        break // Sair do loop após 5 tentativas sem novos elementos
                    }

                    // Aguardar mais tempo e incrementar a contagem de tentativas
                    await frame.waitForTimeout(1000)
                    attempts++
                } else {
                    // Se novos elementos foram carregados, atualizar a lista de elementos e redefinir a contagem de tentativas
                    previousElements = texts
                    attempts = 0
                }

                // Dar um scroll para baixo na div '_aano' para carregar mais elementos (se houver)
                await frame.evaluate(() => {
                    const div = document.querySelector('div._aano')
                    if (div) {
                        div.scrollTop = div.scrollHeight
                        console.log('Scrolling')
                    } else {
                        console.log('Scroll not applied.')
                    }
                })

                // Aguardar um tempo para carregar mais elementos após o scroll
                await frame.waitForTimeout(1000)
            }

            await browser.close()

            const data = {
                Followers: previousElements.filter(
                    followers => followers !== null
                ) as string[]
            }

            return response.status(201).json(data)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ error: 'Scraping error' })
        }
    }
}

export default new InstagramScrapingController()
