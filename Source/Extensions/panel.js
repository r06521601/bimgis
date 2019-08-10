MyAwesomePanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
MyAwesomePanel.prototype.constructor = MyAwesomePanel;
function MyAwesomePanel(viewer, container, id, title, content, x, y) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // the style of the docking panel
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-b');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "400px";
    this.container.style.height = "400px";
    this.container.style.resize = "auto";

    // this is where we should place the content of our panel
    var div = document.createElement('div');
    div.style.margin = '20px';
    div.style.color = 'black';
    this.content = div;


    this.container.appendChild(this.content);
    
    var op = { left: false, heightAdjustment: 45, marginTop: 0 };
    this.scrollcontainer = this.createScrollContainer(op);
    


    $(this.scrollContainer).append(html);
    
}