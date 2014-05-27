/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
var msgCt;
Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.GridWindow',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
        'MyDesktop.Settings',
        'MyDesktop.users.ManagementUsers'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...
        this.msg('Bienvenido', 'Usuario '+ Global.user.usuario +' logeado');
        
        //Ext.Loader.loadScript( "../../pages/shared/options-toolbar.js" );
        
        this.callParent();

        // now ready...
    },
    msg: function(title, format) {
        if (!msgCt) {
            msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.DomHelper.append(msgCt, this.createBox(title, s), true);
        m.hide();
        m.slideIn('t').ghost("t", {delay: 1000, remove: true});
    },
    createBox: function(t, s) {
        // return ['<div class="msg">',
        //         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
        //         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
        //         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
        //         '</div>'].join('');
        return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },

    getModules : function(){
        return [
            new MyDesktop.VideoWindow(),
            //new MyDesktop.Blockalanche(),
            new MyDesktop.SystemStatus(),
            new MyDesktop.GridWindow(),
            new MyDesktop.TabWindow(),
            new MyDesktop.AccordionWindow(),
            new MyDesktop.Notepad(),
            new MyDesktop.BogusMenuModule(),
            new MyDesktop.BogusModule(),
            new MyDesktop.users.ManagementUsers()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' }
                    //,{ name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                    ,{ name: 'Usuarios', iconCls: 'notepad-shortcut', module: 'users-win' }
                ]
            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Marcos Llerena',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 150,
                items: [
                    {
                        text:'Configuración',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Cerrar Sesión',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
                //,{ name: 'Theme', iconCls: 'icon-grid' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        //Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
        var me = this;
        Ext.Msg.confirm('Cerrar Sesión', '¿Está seguro que quiere cerrar sesión?',
                function(buttonId) {
                    console.log("buttonId ->> " + buttonId);
                    if (buttonId==="yes") {
                        Ext.Ajax.request({
                            method : 'POST',
                            url: Global.SECURITY + "/logout/",
                            //params: values,
                            success: function(response, opts) {
                                //var jsonData = Ext.decode(response.responseText);
                                console.log("response logout " );
                                
                                location = Global.HOME_PAGE;
                                
                                //
                                //
                                //console.log("jsonData.success  -> " + jsonData.success);
                                /*
                                if (jsonData.success) {
                                    Global.session = jsonData.login;
                                    location = Global.HOME_PAGE;
                                }
                                */
                            },
                            failure: function(response, opts) {
                                var status = response.status;
                                var statusText = response.statusText;
                                Ext.Msg.alert('Código ' + status, statusText);
                            }
                        });
                    }
                }
        );
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
