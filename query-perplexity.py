# query-perplexity.py
import sys
import asyncio
from camoufox.async_api import AsyncCamoufox

async def main():
    prompt = sys.argv[1]

    async with AsyncCamoufox(headless=True, geoip=True) as browser:
        page = await browser.new_page()
        await page.goto('https://www.perplexity.ai')

        await page.locator('#ask-input').click()
        await page.locator('#ask-input').fill(prompt)
        await page.get_by_role('button', name='Submit').click()

        # Retry toutes les 5s, max 2 min
        copy_btn = page.get_by_role('button', name='Copy', exact=True).last
        deadline = asyncio.get_event_loop().time() + 120
        while asyncio.get_event_loop().time() < deadline:
            if await copy_btn.is_visible():
                break
            await page.wait_for_timeout(5000)

        await page.wait_for_timeout(1500)
        await copy_btn.click()

        text = await page.evaluate("async () => await navigator.clipboard.readText()")
        print(text)

asyncio.run(main())