export const  dateFormatter = (BSONDate:string):string=>{
    const wholeDateSplited: Array<string> = BSONDate.toString().split('T');
  const dateSplited: Array<string> = wholeDateSplited[0].split('-').reverse();
  const hourSplited: Array<string> = wholeDateSplited[1].split(':');
  return `${dateSplited.join('.')} | ${hourSplited[0]}:${hourSplited[1]}`;
}


