Ext.define("MyDesktop.security.LoginForm", {
    extend: "Ext.form.Panel",
    alias: "loginform",
    id: 'status-form',
    forward: true,
    defaults: {
        allowBlank: false,
        selectOnFocus: true,
        msgTarget: 'side'
    },
    initComponent: function() {
        this.items = this.createLoginFields();
        this.dockedItems = this.createButtons();
        this.callParent();
    },
    createButtons: function() {
        return [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                        text: "Ingresar",
                        scope: this,
                        handler: this.login
                    },
                    {
                        text: "Crear cuenta"
                    }
                ]
            },
            Ext.create('Ext.ux.StatusBar', {
                dock: 'bottom',
                id: 'form-statusbar',
                defaultText: ''
                /*,
                plugins: Ext.create('Ext.ux.statusbar.ValidationStatus',
                        {
                            form: 'status-form',
                            showText: 'Existen errores (click para más detalle...)',
                            hideText: 'Click para ocultar la lista de errores'
                        })
                        */
            })

        ];
    },
    createLoginFields: function() {
        return [{
                xtype: 'textfield',
                fieldLabel: "Usuario",
                name: "username",
                allowBlank: false,
                blankText: 'Usuario es requerido'
            }, {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Contraseña',
                name: 'password',
                allowBlank: false,
                blankText: 'Contraseña es requerida',
                listeners: {
                    scope: this,
                    specialkey: function(f, e) {
                        if (e.getKey() == e.ENTER) {
                            this.login();
                        }
                    }
                }
            }];
    },
    login: function() {
        var me = this;
        if (me.getForm().isValid()) {
            console.log("ingreso a isValid()");
            Ext.tip.QuickTipManager.init();
            var values = me.getForm().getValues();
            //operation
            console.log("values  - " + values);
            var wLogin = me.up();
            var el = me.getEl();
            var sb = Ext.getCmp('form-statusbar');
            sb.showBusy('Procesando...');
            el.mask();

            Ext.Ajax.request({
                url: Global.SECURITY + "/login/",
                params: values,
                success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText);
                    console.log("jsonData  -> " + jsonData);
                    console.log("jsonData.message  -> " + jsonData.message);
                    if (jsonData.message === undefined) {
                        Global.connected = true;
                        Global.user = jsonData;
                        me.startDesktop();
                        wLogin.hide();
                    } else {
                        Global.connected = false;
                        console.log("aplicar lo del unmask");
                        sb.setStatus({
                            text: jsonData.message,
                            iconCls: '',
                            clear: true
                        });
                        el.unmask();
                    }

                },
                failure: function(response, opts) {
                    var status = response.status;
                    var statusText = response.statusText;
                    Ext.Msg.alert('Código ' + status, statusText);
                }
            });
        }
    },
    startDesktop: function() {
        
        console.log("start desktop - login form");
        
        Global.startDesktop();
        
        /*
        Ext.require('MyDesktop.App');
        var myDesktopApp;
        Ext.onReady(function() {
            myDesktopApp = new MyDesktop.App();
        });
        */
    }
});