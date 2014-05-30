/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.users.ManagementUsers', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel'
    ],

    id:'users-win',

    init : function(){
        
        // this.launcher .. en menu inicio
        
        /*
        this.launcher = {
            text: 'Administración usuarios',
            iconCls:'bogus'
        }
        */
       
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('users-win');
        if(!win){
            win = desktop.createWindow({
                id: 'users-win',
                title:'Administración de Usuarios',
                width:900,
                height:550,
                iconCls: 'bogus',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'border',//fit
                //layout: 'fit',
                
                items: [
                    
                    {
                        region: 'north',
                        border: false,
                        xtype: 'grid',
                        title: 'Listado de usuarios',
                        width: 450,
                        height: 185,
                        //autoScroll : true,
                        store: new Ext.data.ArrayStore({
                            autoLoad : true,
                            model : 'Usuarios',
                            /*
                            fields: [
                               { name: 'codigo' },
                               { name: 'usuario' },
                               { name: 'clave' },
                               { name: 'persona' },
                               { name: 'usuarioIngreso' },
                               { name: 'usuarioModificacion' },
                               { name: 'fechaIngreso', type: 'date' },
                               { name: 'fechaModificacion', type: 'date' },
                               { name: 'estado' }
                            ],
                            */
                            proxy: {
                                type: 'ajax',
                                url: Global.SECURITY + "/users/",
                                reader: {
                                    type: 'json',
                                    //root: 'images',
                                    idProperty: 'codigo'
                                }
                            }
                        }),
                        columns: [
                            //new Ext.grid.RowNumberer(),
                            {
                                text: "Código",
                                width: 80,
                                sortable: true,
                                dataIndex: 'codigo'
                            },
                            {
                                text: "Usuario",
                                width: 150,
                                sortable: true,
                                dataIndex: 'usuario'
                            },
                            {
                                text: "U. Ingreso",
                                width: 130,
                                sortable: true,
                                dataIndex: 'usuarioIngreso'
                            },
                            {
                                text: "F. Ingreso",
                                width: 140,
                                sortable: true,
                                //format : 'Y-m-d H:i:s',
                                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                                dataIndex: 'fechaIngreso'
                            },
                            {
                                text: "U. Modificación",
                                width: 130,
                                sortable: true,
                                dataIndex: 'usuarioModificacion'
                            },
                            
                            {
                                text: "F. Modificación",
                                width: 140,
                                sortable: true,
                                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                                dataIndex: 'fechaModificacion'
                            },
                            {
                                text: "Estado",
                                width: 100,
                                sortable: true,
                                dataIndex: 'estado'
                            }
                        ],
                        listeners: {
                            selectionchange: function(model, records) {
                                if (records[0]) {
                                    console.log("selectionchange - "+records[0]);
                                    var recordUsuario = records[0];
                                    Ext.getCmp('form-det-cuenta').loadRecord(recordUsuario);
                                    
                                    if(records[0].hasOwnProperty("PersonasHasOneInstance") ){
                                        var recordPersona = records[0].getPersonas( );
                                        Ext.getCmp('form-dat-personales').loadRecord(recordPersona);
                                    }else{
                                        Ext.getCmp('form-dat-personales').getForm().reset();
                                    }
                                    
                                    //
                                    
                                    
                                    //console.log("persona - "+persona);
                                    
                                    //if(recordPersona)Ext.getCmp('form-dat-personales').loadRecord(recordPersona);
                                    
                                    
                                }
                            }
                        }
                    },
                    {
                        id : 'tabpanel-detalle',
                        xtype:'tabpanel',
                        region: 'center',
                        activeTab: 0,
                        defaults:{
                            bodyPadding: 10,
                            layout: 'anchor'
                        },
                        items:[
                            {
                                //region: 'center',
                                id : 'form-det-cuenta',
                                border: false,
                                xtype: 'form',
                                title: 'Detalles de la cuenta',
                                bodyPadding: 5,

                                // The form will submit an AJAX request to this URL when submitted
                                url: 'save-form.php',

                                // Fields will be arranged vertically, stretched to full width
                                //layout: 'anchor',
                                defaults: {
                                    //anchor: '100%'
                                    width: 240,
                                    labelWidth: 90
                                },

                                // The fields
                                defaultType: 'textfield',

                                items: [
                                    {
                                        fieldLabel: 'Código',
                                        name: 'codigo',
                                        readOnly : true
                                    },
                                    {
                                        fieldLabel: 'Usuario',
                                        name: 'usuario'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Ingreso',
                                        name: 'fechaIngreso',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Modificación',
                                        name: 'fechaModificacion',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                                    },
                                    {
                                        fieldLabel: 'Estado',
                                        name: 'estado',
                                        readOnly : true
                                    }
                                ]

                                // Reset and Submit buttons
                                /*
                                buttons: [
                                    {
                                        text: 'Reset',
                                        handler: function() {
                                            this.up('form').getForm().reset();
                                        }
                                    }, {
                                        text: 'Submit',
                                        formBind: true, //only enabled once the form is valid
                                        disabled: true,
                                        handler: function() {
                                            var form = this.up('form').getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    success: function(form, action) {
                                                       Ext.Msg.alert('Success', action.result.msg);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert('Failed', action.result.msg);
                                                    }
                                                });
                                            }
                                        }
                                    }
                                ]
                                */
                            },
                            {
                                id : 'form-dat-personales',
                                border: false,
                                xtype: 'form',
                                title: 'Datos personales',
                                bodyPadding: 5,

                                // The form will submit an AJAX request to this URL when submitted
                                url: 'save-form.php',

                                // Fields will be arranged vertically, stretched to full width
                                //layout: 'anchor',
                                defaults: {
                                    //anchor: '100%'
                                    width: 240,
                                    labelWidth: 90
                                },

                                // The fields
                                defaultType: 'textfield',

                                items: [
                                    {
                                        fieldLabel: 'Nombre',
                                        name : 'primerNombre'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Ingreso',
                                        name: 'fechaIngreso',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Modificación',
                                        name: 'fechaModificacion',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                                    },
                                    {
                                        fieldLabel: 'Estado',
                                        name: 'estado',
                                        readOnly : true
                                    }
                                ]

                                // Reset and Submit buttons
                                /*
                                buttons: [
                                    {
                                        text: 'Reset',
                                        handler: function() {
                                            this.up('form').getForm().reset();
                                        }
                                    }, {
                                        text: 'Submit',
                                        formBind: true, //only enabled once the form is valid
                                        disabled: true,
                                        handler: function() {
                                            var form = this.up('form').getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    success: function(form, action) {
                                                       Ext.Msg.alert('Success', action.result.msg);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert('Failed', action.result.msg);
                                                    }
                                                });
                                            }
                                        }
                                    }
                                ]
                                */
                            }  
                        ]
                    }
                ]
            });
        }
        return win;
    }
});
