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
}

const getPageNo = function(listUrl) {
  const urlObj = url.parse(listUrl);
  const pathname = urlObj.pathname;
  const matchResult = pathname.match(/.+pn([0-9]+)\/$/);
  return (matchResult && matchResult[1]) || 1;
}

const nextPageUrl = function(listUrl) {
  const urlObj = url.parse(listUrl);
  const pathname = urlObj.pathname;
  const matchResult = pathname.match(/.+pn([0-9]+)\/$/);
  if (!matchResult) {
    pathname += 'pn2';
  } else {
    const pageNo = matchResult[1] + 1;
    pathname.replace(/.+\/pn[0-9]+\//, 'pn' + pageNo);
  }
  return url.format(urlObj);
}

const crawl = function(listUrl) {
  return crawlListPage(listUrl).catch((error) => {
    console.log('crawlListPage error: ' + error);
  }).then(() => {
    return crawl(nextPageUrl(listUrl));
  });
}
const crawlListPage = function(listUrl) {

}

const crawlItemPage = function(itemUrl) {

}

run();
