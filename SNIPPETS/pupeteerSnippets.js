// Pour tester les sélectors dans la console :
> const art1 = document.querySelector('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a');
> undefined
> art1

> const arts4 = document.querySelectorAll('div.image_container > a ');
> undefined
> arts4

await page.waitFor(1000) // fait une pause d'une seconde
await page.waitFor('body')

/*- await Promise.all(promesse1, promesse2, promesse3):
bloque de programme tant que toutes les promesses ne sont pas résolues
*/
const results = await Promise.all(
    urlList.map(url => getDataFromUrl(browser, url)),
  )

    //await page.waitFor(1000) // fait une pause d'une seconde

    
  function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }


