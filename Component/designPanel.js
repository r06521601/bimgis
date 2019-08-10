function showDmodel(){
    egg = document.getElementsByTagName('input')[0].checked;
    if(!egg){
        document.greenBox.show = false;
        document.getElementById('Checkbar').style.position = 'fixed';
        document.getElementById('Checkbar').style.opacity = 0;
    }
    else{
        document.greenBox.show = true;
        document.getElementById('Checkbar').style.position = 'initial';
        document.getElementById('Checkbar').style.opacity = 1;
    }
}
function move(){
    var elem=document.getElementById("myBar");
    var width=10; 
    var id=setInterval(frame, 10); 
    function frame(){
        if (width >=100)
        {
            clearInterval(id);

            document.querySelector('#Checkbar > table:nth-child(6) > tbody > tr:nth-child(1) > td').innerText = "符合"
            document.querySelector('#Checkbar > table:nth-child(6) > tbody > tr:nth-child(2) > td').innerText = "符合"
            document.querySelector('#Checkbar > table:nth-child(6) > tbody > tr:nth-child(3) > td').innerText = "符合"
            document.querySelector('#Checkbar > table:nth-child(6) > tbody > tr:nth-child(4) > td').innerText = "违规"
            document.querySelector('#Checkbar > table:nth-child(6) > tbody > tr:nth-child(5) > td').innerText = "符合"
        }
        else{
            width++; elem.style.width=width + "%"; elem.innerHTML=width * 1 + "%";
        }
    }
}

//////////////////////////////////////////////////////////////////////////
// Design model and region
//////////////////////////////////////////////////////////////////////////
function initialDesign(viewer){ 
    //create design model
    var greenBox = viewer.entities.add({
        name : '设计模型',
        polylineVolume : {
            positions : [new Cesium.Cartesian3.fromDegrees(-122.3892091861, 37.7738780081, -29.2504926276),
                new Cesium.Cartesian3.fromDegrees(-122.3892480337, 37.7754872048, -28.9870413317),
                new Cesium.Cartesian3.fromDegrees(-122.3881664472, 37.7754636487, -28.7960743653),
                new Cesium.Cartesian3.fromDegrees(-122.388121449, 37.773975726, -28.9640646892)],
            shape :[new Cesium.Cartesian2(-10, -10),
                    new Cesium.Cartesian2(10, -10),
                    new Cesium.Cartesian2(10, 10),
                    new Cesium.Cartesian2(-10, 10)],
            cornerType : Cesium.CornerType.BEVELED,
            material : Cesium.Color.WHITE.withAlpha(0.5),
            outline : true,
            outlineColor : Cesium.Color.BLACK
        }
    });

    greenBox.show = false;

    //create region
    var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0];

    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-modals'); 

    var e = viewer.entities.add({
        polygon : {
            hierarchy : {
                positions : [new Cesium.Cartesian3.fromDegrees(-122.3897195868, 37.7761320483, -28.8083237172),
                                new Cesium.Cartesian3.fromDegrees(-122.3894522363, 37.7730635703, -29.0436988295),
                                new Cesium.Cartesian3.fromDegrees(-122.3877113228, 37.7734856854, -29.139382365),
                                new Cesium.Cartesian3.fromDegrees(-122.3878530435, 37.7763023092, -29.0629695339)]
            },
            material : Cesium.Color.BLUE.withAlpha(0.5)
        },
        name:"宗地编号CH43",
        description: 'Loading <div class="cesium-infoBox-loading"></div>',
        description: 
                '<h2 style="font-size: 22px;">宗地基本资讯</h2>'+
                '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<link rel="stylesheet" href="/Component/designPanel.css" media="screen">'+
                '<tr><th>宗地编号</th><td>' + "CH43" + '</td></tr>' +
                '<tr><th>宗地位置</th><td>' + "福州市XX区XX路XX号" + '</td></tr>' +
                '<tr><th>净用地面积(平方公米)</th><td>' + "48.9096" + '</td></tr>' +
                '<tr><th>土地用途及使用年限</th><td>' + "商业40年" + '</td></tr>' +
                '<tr><th>拍卖起叫价</th><td>' + "楼面地价:3000元/平方米" + '</td></tr>' +
                '<tr><th>竞买保证金(万元)</th><td>' + "7300" + '</td></tr>' +
                '<tr><th>拍卖出让时间</th><td>' + "2018/07/02" + '</td></tr>' +
                '<tr><th>持证准用面积(亩)及方式</th><td>' + "48.9096指标证书" + '</td></tr>' +
                '<tr><th>出让人</th><td>' + "福州市国土资源局" + '</td></tr>' +
                '</tbody></table>'+
                '<h2 style="font-size: 22px;text-align: right;">显示模型  <label class="switch" style="top: -24px;"><input type="checkbox" onclick="showDmodel()"><span class="slider round"></span></label></h2>'+
                '<div id="Checkbar" style="position: fixed;visibility: visible;opacity: 0;transition:opacity 0.2s linear;">'+
                '<a href="Source/SampleData/designModel.ifc" download>'+
                '<button id="Mydownload"">导出模型</button>'+
                '</a>'+
                '<h2 style="font-size: 22px;">项目模型基本资讯</h2>'+
                '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<tr><th>项目名称</th><td>' + "福州市建案A" + '</td></tr>' +
                '<tr><th>业主方</th><td>' + "公司B" + '</td></tr>' +
                '<tr><th>设计方</th><td>' + "单位C" + '</td></tr>' +
                '<tr><th>上传作者</th><td>' + "雷翔" + '</td></tr>' +
                '<tr><th>上传时间</th><td>' + "2019/04/06" + '</td></tr>' +
                '</tbody></table>'+
                '<button id="Mybutton" onclick="move()">查验</button>'+
                '<h2 style="font-size: 22px;">规则设计条件</h2>'+
                '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<tr><th>设计容积率总建筑面积/容积率</th><td>' + " " + '</td></tr>' +
                '<tr><th>建筑密度</th><td>' + " " + '</td></tr>' +
                '<tr><th>建筑高度</th><td>' + " " + '</td></tr>' +
                '<tr><th>绿地率</th><td>' + " " + '</td></tr>' +
                '<tr><th>规划用地使用性质</th><td>' + " " + '</td></tr>' +
                '</tbody></table>'+
                '<br>'+
                '<div id="myProgress"> <div id="myBar">0%</div></div><br>'+
                '</div>'
    });

    //Infobox event add method
    viewer.infoBox.frame.addEventListener('load', function() {
        //
        // Now that the description is loaded, register a click listener inside
        // the document of the iframe.
        //

        viewer.infoBox.frame.contentDocument.greenBox = greenBox
        viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e) {
            //
            // The document body will be rewritten when the selectedEntity changes,
            // but this body listener will survive.  Now it must determine if it was
            // one of the clickable buttons.
            //
        if(viewer.infoBox.frame.contentDocument.body.getElementsByClassName('script').length == 0)
        {
            // Create the element

            var script = document.createElement("script");
            var script1 = document.createElement("script");

            // Add script content

            script.innerHTML = "function showDmodel(){egg = document.getElementsByTagName('input')[0].checked;if(!egg){document.greenBox.show = false;document.getElementById('Checkbar').style.position = 'fixed';document.getElementById('Checkbar').style.opacity = 0;}else{document.greenBox.show = true;document.getElementById('Checkbar').style.position = 'initial';document.getElementById('Checkbar').style.opacity = 1;}}";

            script1.innerHTML ='function move(){var t=document.getElementById("myBar"),e=10,n=setInterval(function(){e>=100?(clearInterval(n),document.querySelector("#Checkbar > table:nth-child(6) > tbody > tr:nth-child(1) > td").innerText="符合",document.querySelector("#Checkbar > table:nth-child(6) > tbody > tr:nth-child(2) > td").innerText="符合",document.querySelector("#Checkbar > table:nth-child(6) > tbody > tr:nth-child(3) > td").innerText="符合",document.querySelector("#Checkbar > table:nth-child(6) > tbody > tr:nth-child(4) > td").innerText="违规",document.querySelector("#Checkbar > table:nth-child(6) > tbody > tr:nth-child(5) > td").innerText="符合"):(e++,t.style.width=e+"%",t.innerHTML=1*e+"%")},10)}';
            
            viewer.infoBox.frame.contentDocument.body.appendChild(script)
            viewer.infoBox.frame.contentDocument.body.appendChild(script1)

        }
        }, false);
    }, false);

    //viewer.zoomTo(e)
}

function zToDesign(){
    document.getElementsByClassName('material-icons')[1].style.color = "#555"

    viewer.camera.position.x = -2704200.3826234774
    viewer.camera.position.y = -4263014.019114195
    viewer.camera.position.z = 3885594.1665674616

}
