/**
 * The parameter to store all the items in project.
 * @[[name,location, description], .......]
 */
var searchlist = [
    ["项目1-跨海大桥", [-122.3824902788, 37.7929248276, 60], ["单位A", "公司C"]],
    ["项目2-高楼公寓", [-122.3790379375, 37.7488993253, 40], ["单位A", "公司B"]],
    ["项目3-高楼公寓", [-122.3807264093, 37.7498937144, 55], ["单位B"]],
    ["项目4-集合住宅", [-122.378874873, 37.7506400657, 20], ["单位C", "公司B"]],
    ["项目5-高架陆桥", [-122.3923756354, 37.7749991826, 10], ["单位A"]],
    ["运维1-高架陆桥", [-122.3903065988, 37.7767428174, 10], ["单位A"]],
    ["运维2-高架陆桥", [-122.3979076059, 37.7707659504, 10], ["单位A"]],
    ["宗地1-CH43", [-122.3887006776, 37.774751617, 10], ["公司B"]]
];

/**
 * This class is an example of a custom geocoder. It provides geocoding by searching inside a LabelCollection.
 * @alias LabelCollectionGeocoder
 * @constructor
 */

function LabelCollectionGeocoder() {
}

/**
 * The function called to geocode using this geocoder service.
 *
 * @param {String} input The query to be sent to the geocoder service
 * @returns {Promise<GeocoderResult[]>}
 */



LabelCollectionGeocoder.prototype.geocode = function (input) {

    var searchtext = input;
    var searchresult = [];
    searchlist.forEach(function(data){
        if(data[0].includes(input)){
            searchresult.push(data)
        }
        data[2].forEach(function(descri){
            if(descri.includes(input)){
                searchresult.push(data)
            }
        })
    })
    

    var endpoint = 'https://nominatim.openstreetmap.org/search';
    var resource = new Cesium.Resource({
        url: endpoint,
        queryParameters: {
            format: 'json',
            q: "泰國"
        }
    });

    return resource.fetchJson()
        .then(function (results) {
            var bboxDegrees;
            return searchresult.map(function (resultObject) {
                //bboxDegrees = resultObject.boundingbox;
                return {
                    displayName: resultObject[0],
                    destination: Cesium.Cartesian3.fromDegrees(
                        resultObject[1][0],
                        resultObject[1][1],
                        resultObject[1][2]
                    )
                };
            });
        });

};
