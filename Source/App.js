(function () {
    "use strict";

    // TODO: Add your ion access token from cesium.com/ion/
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDVhMzA1ZS01YzY2LTQzM2EtYTI0NC01MDdmNTczY2QxYmEiLCJpZCI6ODg1OCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1Mjk2ODA0M30.LDvNJRkva9ExCtYC4CzR1W9WVO0e4fohwi6nHq-Z0Po';

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

    var viewer = new Cesium.Viewer('cesiumContainer', {

        geocoder: new LabelCollectionGeocoder(),
        scene3DOnly: false,
        selectionIndicator: false,
        baseLayerPicker: false
    });

    document.getElementsByClassName('cesium-viewer-bottom')[0].style.display = 'none';
    document.getElementsByClassName('cesium-viewer-animationContainer')[0].style.display = 'none';
    document.getElementsByClassName('cesium-viewer-timelineContainer')[0].style.display = 'none';
    //////////////////////////////////////////////////////////////////////////
    // Style define
    //////////////////////////////////////////////////////////////////////////

    // Define a white, opaque building style
    var defaultStyle = new Cesium.Color(1,1,1,1)
    var PdefaultStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white')",
        show : true
    });

    // Highlight element
    var highlighting = new Cesium.Color(0, 87/255, 215/255, 0.4)
    var Phighlighting = new Cesium.Cesium3DTileStyle({
        color : "color('blue',0.7)",
        show : true
    });

    // select element
    var selectedStyle =  new Cesium.Color(0, 87/255, 215/255, 0.2)
    var PselectedStyle = new Cesium.Cesium3DTileStyle({
        color : "color('blue', 0.4)",
        show : true
    });


    //////////////////////////////////////////////////////////////////////////
    // Mouse events
    //////////////////////////////////////////////////////////////////////////

    var scene = viewer.scene;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var SelectedObj= null;
    var picked = null;
    function getSelectedObjFromPoint(Position){
        var valueToReturn= null;
        SelectedObj = null;
        var pickedObject = viewer.scene.pick(Position);
        var pickedObjects = viewer.scene.drillPick(Position);
        picked = pickedObjects[0];
        if (!Cesium.defined(pickedObject)) {
            picked = null;
            valueToReturn = null;
            if(window.ppp != window.selected)
            {
                if(window.ppp._batchId != undefined){
                    window.ppp.color = defaultStyle;
                    window.ppp = null;
                }
                else{
                    window.ppp.content._tile.color = defaultStyle;
                    window.ppp = null;
                }
                
            }
        }
        else {
            valueToReturn = pickedObject;
            if(window.ppp != undefined & window.ppp != window.selected)
            {
                if(window.ppp._batchId != undefined){
                    window.ppp.color = defaultStyle;
                }
                else{
                    window.ppp.content._tile.color = defaultStyle;
                }
            }
            if(pickedObject.id == undefined)
            {
                window.ppp = pickedObject;
            }
            if(window.ppp != window.selected)
            {
                if(window.ppp._batchId != undefined){
                    window.ppp.color = highlighting;
                }
                else{
                    window.ppp.content._tile.color = highlighting;
                }
            }
        }
        return valueToReturn;
    }
    var show = function () {
    if (SelectedObj != null) {
        //when selected entities
        try {
            if(SelectedObj.id._description._value != null)
            {
                try {
                    closeDash()
                    
                } catch (error) {
                    
                }
                try {
                    closeUniProg()
                    
                } catch (error) {
                    
                }try {
                    closeDesign()
                    
                } catch (error) {
                    
                }try {
                    closeFacility()
                    
                } catch (error) {
                    
                }
            }
            
        } catch (error) {
            
        }
        
        //selected model or build
        if(window.selected != undefined)
        {
            if(window.selected._batchId != undefined){
                window.selected.color = defaultStyle;
            }
            else{
                window.selected.content._tile.color = defaultStyle;
            }
        }
        if(SelectedObj.id == undefined)
        {
            window.selected = SelectedObj;
        }
        if(window.selected._batchId != undefined){
            window.selected.color = selectedStyle;
        }
        else{
            window.selected.content._tile.color = selectedStyle;
        }
    }
    else{
        if(window.selected._batchId != undefined){
            window.selected.color = defaultStyle;
        }
        else{
            window.selected.content._tile.color = defaultStyle;
        }
        window.selected = null;
    }
    }

    var div = document.getElementById('cesiumContainer')
    div.addEventListener('click', show, false);

    //Right click panel
    $(document).on("contextmenu", function(event) {
        event.preventDefault();
        if(picked != null)
        {
            $(".context")
              .show()
              .css({
                top: event.pageY,
                left: event.pageX
              });
              if(viewer.trackedEntity != undefined)
              {
                $("#rp_focus_c").show();
                
              }

        }
      });
    $(document).click(function() {
        $(".context").fadeOut("fast");
    
    });
    $("#rp_select").click(function(){
        //select
        show()
        });
    $("#rp_hidden").click(function(){
        //hidden
        if(window.ppp._batchId != undefined){
            window.ppp.show = false;
        }
        else{
            window.ppp.primitive.show = false;
        }
        });
    $("#rp_focus").click(function(){
        //focus
        viewer.trackedEntity = undefined;
    })

    
    handler.setInputAction(function (movement) {
        SelectedObj= getSelectedObjFromPoint(movement.endPosition);
       }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


    //////////////////////////////////////////////////////////////////////////
    // Load 3D Tileset
    //////////////////////////////////////////////////////////////////////////

    //Project1
    var city = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(18720)
        })
    );

    // Adjust the tileset height so it's not floating above terrain
    var heightOffset = -30;
    city.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        
    });
    //bridge
    var bridge = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(21002)
        })
    );
    bridge.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        
    });
    //bridge2
    var bridge2 = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(21003)
        })
    );
    bridge2.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        
    });

    var whiteObjForExample = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(18817)
        })
    );
    viewer.zoomTo(whiteObjForExample)

    setTimeout(function(){ 
        viewer.camera.position.x = -2710107.4954217724
        viewer.camera.position.y = -4270920.8520668605
        viewer.camera.position.z = 3880890.8392861728
     }, 1800);
    

    var heightOffset2 = -80;
    whiteObjForExample.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset2);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });

    heightOffset2 = 20;
    //Project2
    var Project2 = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(18983)
        })
    );
    Project2.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset2);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
    //Project3
    var Project3 = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(18981)
        })
    );
    Project3.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset2);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });

    //Project4
    var Project4 = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(18982)
        })
    );
    Project4.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset2);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
    //Project5
    var Project5 = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(19640)
        })
    );
    Project5.readyPromise.then(function(tileset) {
        // Position tileset
        var boundingSphere = tileset.boundingSphere;
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
        var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset2);
        var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    });
    // Set the tileset style to default
    city.style = defaultStyle;
    //whiteObjForExample.style = defaultStyle
    Project2.style = defaultStyle;
    Project3.style = defaultStyle;
    Project4.style = defaultStyle;
    Project5.style = defaultStyle;


    //////////////////////////////////////////////////////////////////////////
    // Select Project
    //////////////////////////////////////////////////////////////////////////
    var tileStyle = document.getElementById('slct');
    function set3DTileStyle() {
        var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
        if (selectedStyle === 'project1') {
            viewer.zoomTo(city)
            try {
                closeUniProg()
            } catch (error) {
                
            }
            setTimeout(function(){ 
                showProg();
             }, 200);
        } else if (selectedStyle === 'project2') {
            viewer.zoomTo(Project2)
            try {
                closeUniProg()
            } catch (error) {
                
            }setTimeout(function(){ 
                showProg();
             }, 200);
        } else if (selectedStyle === 'project3') {
            viewer.zoomTo(Project3)
            try {
                closeUniProg()
            } catch (error) {
                
            }setTimeout(function(){ 
                showProg();
             }, 200);
        } else if (selectedStyle === 'project4') {
            viewer.zoomTo(Project4)
            try {
                closeUniProg()
            } catch (error) {
                
            }setTimeout(function(){ 
                showProg();
             }, 200);
        }  else if (selectedStyle === 'project5') {
            viewer.zoomTo(Project5)
            try {
                closeUniProg()
            } catch (error) {
                
            }setTimeout(function(){ 
                showProg();
             }, 200);
        } else if (selectedStyle === 'project6') {
            zToDesign()
            try {
                closeDesign()
            } catch (error) {
                
            }setTimeout(function(){ 
                showDesign();
             }, 200);
        } else if (selectedStyle === 'project7') {
            viewer.zoomTo(bridge)
            try {
                closeFacility()
            } catch (error) {
                
            }setTimeout(function(){ 
                showFacility();
             }, 200);
        } else if (selectedStyle === 'project8') {
            viewer.zoomTo(bridge2)
            try {
                closeFacility()
            } catch (error) {
                
            }setTimeout(function(){ 
                showFacility();
             }, 200);
        } 
    }
    tileStyle.addEventListener('change', set3DTileStyle);

    window.viewer = viewer;

    var heightStyle = new Cesium.Cesium3DTileStyle({
        color : {
            conditions : [
                            ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
                            ["${height} >= 200", "rgb(102, 71, 151)"],
                            ["${height} >= 100", "rgb(170, 162, 204)"],
                            ["${height} >= 50", "rgb(224, 226, 238)"],
                            ["${height} >= 25", "rgb(252, 230, 200)"],
                            ["${height} >= 10", "rgb(248, 176, 87)"],
                            ["${height} >= 5", "rgb(198, 106, 11)"],
                            ["true", "rgb(127, 59, 8)"]
                        ]
        }
    });
    whiteObjForExample.style = heightStyle;

    //////////////////////////////////////////////////////////////////////////
    // Loading and Styling Entity Data
    //////////////////////////////////////////////////////////////////////////
    var done_color = new Cesium.Color(64/255, 181/255, 97/255, 1)
    var delay_color = new Cesium.Color(192/255, 53/255, 53/255, 1)
    var pinBuilder = new Cesium.PinBuilder();
    var cameraPin = Cesium.when(pinBuilder.fromMakiIconId('cinema', Cesium.Color.BLACK, 48), function(canvas) {
        return viewer.entities.add({
            name : '监视镜头',
            position : Cesium.Cartesian3.fromDegrees(-122.392725781, 37.7752079799, 10),
            billboard : {
                image : canvas.toDataURL(),
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM
            },

            description :
            '<div className="vd"><video style="width: 100%;" controls>'+
            '<source src="Source/Images/bridgevideo.mp4" type="video/mp4" />'+
            '</video></div>'
        });
    });
    var entityyy = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(-122.3824902788, 37.7929248276, 60),
        label : {
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : pinBuilder.fromColor(done_color, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        },
        name:"跨海大桥",
    });
    var entityyy2 = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(-122.3790379375, 37.7488993253, 40),
        label : {
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : pinBuilder.fromColor(done_color, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        },
        name:"高楼公寓",
    });
    var entityyy3 = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(-122.3807264093, 37.7498937144, 55),
        label : {
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : pinBuilder.fromColor(delay_color, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        },
        name:"高楼公寓",
    });
    var entityyy4 = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(-122.378874873, 37.7506400657, 20),
        label : {
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : pinBuilder.fromColor(done_color, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        },
        name:"集合住宅",
        
    });

    var entityyy5 = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(-122.3923756354, 37.7749991826, 10),
        label : {
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : pinBuilder.fromColor(delay_color, 48).toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        },
        name:"高架陆桥",
        
    });

    initialDesign(viewer);

}());