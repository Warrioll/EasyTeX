export const chceckIfBlockContentEmpty = (content:string):boolean=>{
  console.log('ifContentEmpty: ', content)
    content=content.replaceAll('<p>', '')
    content=content.replaceAll('</p>', '')

    content=content.replaceAll('<strong>', '')
    content=content.replaceAll('</strong>', '')

    content=content.replaceAll('<code>', '')
    content=content.replaceAll('</code>', '')

    content=content.replaceAll('<u>', '')
    content=content.replaceAll('</u>', '')

    content=content.replaceAll('<em>', '')
    content=content.replaceAll('</em>', '')

    content=content.replaceAll('<s>', '')
    content=content.replaceAll('</s>', '')

    //tu jescze wyliczenia i linki itp od textfielda
    if(content===''){
      return true;
    }
    return false;
  }