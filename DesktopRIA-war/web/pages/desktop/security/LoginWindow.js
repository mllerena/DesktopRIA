Ext.define("MyDesktop.security.LoginWindow", {
    alternateClassName: "MyDesktop.LoginWindow",
    extend: "Ext.Window",
    requires: [
        "MyDesktop.security.LoginForm",
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.statusbar.ValidationStatus'
    ],
    id: 'idLogin',
    title: 'Autenticación',
    bodyPadding: 10,
    //modal: true,
    //draggable: false,
    resizable: false,
    width: 300,
//    height: 200,
    closable: false,
    forward: true,
    initComponent: function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems: function() {
        return [{
                xtype: "component"
            },
            Ext.create("MyDesktop.security.LoginForm", {forward: this.forward})
        ]; 
    }
});