function createNode(text) {
  const node = document.createElement('pre');
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.position = 'fixed';
  node.style.top = '5px';
  node.textContent = text;
  return node;
}

function copyNode(node) {
  const selection = getSelection();
  selection.removeAllRanges();

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);

  document.execCommand('copy');
  selection.removeAllRanges();
}

function copyAttribute(element) {
  const color = element.getAttribute('color');
  // console.log('color: ', color);
  const node = createNode(color);
  document.body.appendChild(node);
  copyNode(node);
  document.body.removeChild(node);
}

function copyColor(color) {
  const node = createNode(color);
  document.body.appendChild(node);
  copyNode(node);
  document.body.removeChild(node);
}

export const copyToClipboard = (event, color) => {
  const parent = event.target.parentNode.parentNode.id;
  const element = parent ? document.getElementById(parent) : null;

  if (color) {
    console.log(color);
    try {
      copyColor(color);
    } catch (error) {
      console.log(error);
    }
  }

  if (element) {
    try {
      copyAttribute(element);
    } catch (error) {
      console.log(error);
    }
  }
};

// export default async function clipboard(event) {
//   console.log('copying: ', event.target, event);
//   event.preventDefault();
//   const parent = event.target.parentNode.parentNode.id;
//   const node = parent ? document.getElementById(parent) : null;
//   console.log('node: ', node);
//   const permission = await navigator.permissions.query({ name: 'clipboard-write' });
//   console.log('got permission? ', permission);

//   if (permission.state == 'granted' || permission.state == 'prompt') {
//     /* write to the clipboard now */

//     if (node) {
//       const color = node.getAttribute('color');
//       console.log('color: ', color);

//       try {
//         const copied = await navigator.clipboard.writeText(color);
//         console.log('copied: ', copied);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
// }
