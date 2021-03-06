const url = require('url');
const CachedSuperAgent = require('./CachedSuperAgent');

const request = new CachedSuperAgent('GBK', 15000, 20000);

const { _58config } = require('./config');

const genSearchUrl  = function(_58config, pageNo) {
  const { area, tower, houseType, price } = _58config;

  const urlObj = url.parse(_58config.url);
  let reservedPath = urlObj.path;

  // resolve area and tower
  let path = tower || area;

  path += reservedPath;

  // 0 is personal, 1 is agent
  path += '/0';

  // resolve houseType
  path += '/' + getHouseType(houseType);

  urlObj.pathname = path;

  // resolve price
  urlObj.search = 'minprice=' + _58config.price.replace('-', '_');
  return url.format(urlObj);
}

const getHouseType = function(houseType) {
  switch (houseType) {
    case 'zhengzu-2':
      return 'j2';
  }
}

const run = function() {
  const indexUrl = genSearchUrl(_58config);
  console.log(url.parse('http://sh.58.com/beicai/zufang/0/j2/pn2/?minprice=3000_4000&PGTID=0d300008-0061-45ac-37e8-2fd64e60e3ec&ClickID=2').pathname);
}

const getPageNo = function(listUrl) {
  const urlObj = url.parse(listUrl);
  const pathname = urlObj.pathname;
  console.log(pathname);
}

const crawlListPage = function(listUrl) {

}

const crawlItemPage = function(itemUrl) {

}

run();
