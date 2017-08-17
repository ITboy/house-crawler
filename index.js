const url = require('url');

const { _58config } = require('./config');

const genSearchUrl  = function(_58config) {
  const { area, tower, houseType, price } = _58config;

  const urlObj = url.parse(_58config.url);
  let path = urlObj.path;

  // resolve area and tower
  path = (tower || area) + path;

  // resolve houseType
  path += '/' + getHouseType(houseType);
  urlObj.path = path;

  // resolve price
  urlObj.search = '?minprice=' + _58config.price.replace('-', '_');

  return url.format(urlObj);
}

const getHouseType = function(houseType) {
  switch (houseType) {
    case 'zhengzu-2':
      return 'j2';
  }
}

console.log(genSearchUrl(_58config));
