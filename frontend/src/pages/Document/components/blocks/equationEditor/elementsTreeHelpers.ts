export const updateIdx = (array, preIdx) => {
    const preIdxCopy = [...preIdx];
    for (let i = 0; i < array.length; i++) {
      let idxs = [...preIdxCopy, i];
      if (array[i] !== null) {
        array[i].value = idxs.join('.');
        if (array[i].label === 'Expression' && array[i].content === undefined) {
          array[i].content = 'undefined!';
        }
        array[i].children = updateIdx(array[i].children, idxs);
      }
    }
   // console.log('updateX:', array);
    return array;
  };