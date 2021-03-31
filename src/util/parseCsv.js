const CHAR_DELIMITER = ';';
const LINE_BREAK = '\r\n';

const getHeader = (obj) => {
  let header = '';
  for ( var prop  in obj ) {
    header += prop + CHAR_DELIMITER;
  }
  return header + LINE_BREAK;
}

const getContent = (obj) => {
  return obj.map(value => {
    let line = '';
    for ( var prop  in value ) {
      line += value[prop] + CHAR_DELIMITER;
    }
    return line + LINE_BREAK;
  })
}

const exportCsv = (obj) => {
  const header = getHeader(obj[0]);
  const content = getContent(obj);
  const arrCsv = [header, ...content];
  return arrCsv.reduce((content = '', currentLine) => (content += currentLine));
}

module.exports = exportCsv;