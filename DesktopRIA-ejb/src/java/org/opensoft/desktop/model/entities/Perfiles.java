/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.model.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author MLLERENA
 */
@Entity
@Table(name = "perfiles")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Perfiles.findAll", query = "SELECT p FROM Perfiles p"),
    @NamedQuery(name = "Perfiles.findByCodigo", query = "SELECT p FROM Perfiles p WHERE p.perfilesPK.codigo = :codigo"),
    @NamedQuery(name = "Perfiles.findByRoles", query = "SELECT p FROM Perfiles p WHERE p.perfilesPK.roles = :roles"),
    @NamedQuery(name = "Perfiles.findByUsuarios", query = "SELECT p FROM Perfiles p WHERE p.perfilesPK.usuarios = :usuarios"),
    @NamedQuery(name = "Perfiles.findByUsuarioIngreso", query = "SELECT p FROM Perfiles p WHERE p.usuarioIngreso = :usuarioIngreso"),
    @NamedQuery(name = "Perfiles.findByUsuarioModificacion", query = "SELECT p FROM Perfiles p WHERE p.usuarioModificacion = :usuarioModificacion"),
    @NamedQuery(name = "Perfiles.findByFechaIngreso", query = "SELECT p FROM Perfiles p WHERE p.fechaIngreso = :fechaIngreso"),
    @NamedQuery(name = "Perfiles.findByFechaModificacion", query = "SELECT p FROM Perfiles p WHERE p.fechaModificacion = :fechaModificacion"),
    @NamedQuery(name = "Perfiles.findByEstado", query = "SELECT p FROM Perfiles p WHERE p.estado = :estado")})
public class Perfiles implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PerfilesPK perfilesPK;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "USUARIO_INGRESO")
    private String usuarioIngreso;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "USUARIO_MODIFICACION")
    private String usuarioModificacion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_INGRESO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaIngreso;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_MODIFICACION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaModificacion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "ESTADO")
    private String estado;
    @JoinColumn(name = "USUARIOS", referencedColumnName = "CODIGO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Usuarios usuarios1;
    @JoinColumn(name = "ROLES", referencedColumnName = "CODIGO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Roles roles1;

    public Perfiles() {
    }

    public Perfiles(PerfilesPK perfilesPK) {
        this.perfilesPK = perfilesPK;
    }

    public Perfiles(PerfilesPK perfilesPK, String usuarioIngreso, String usuarioModificacion, Date fechaIngreso, Date fechaModificacion, String estado) {
        this.perfilesPK = perfilesPK;
        this.usuarioIngreso = usuarioIngreso;
        this.usuarioModificacion = usuarioModificacion;
        this.fechaIngreso = fechaIngreso;
        this.fechaModificacion = fechaModificacion;
        this.estado = estado;
    }

    public Perfiles(long codigo, long roles, long usuarios) {
        this.perfilesPK = new PerfilesPK(codigo, roles, usuarios);
    }

    public PerfilesPK getPerfilesPK() {
        return perfilesPK;
    }

    public void setPerfilesPK(PerfilesPK perfilesPK) {
        this.perfilesPK = perfilesPK;
    }

    public String getUsuarioIngreso() {
        return usuarioIngreso;
    }

    public void setUsuarioIngreso(String usuarioIngreso) {
        this.usuarioIngreso = usuarioIngreso;
    }

    public String getUsuarioModificacion() {
        return usuarioModificacion;
    }

    public void setUsuarioModificacion(String usuarioModificacion) {
        this.usuarioModificacion = usuarioModificacion;
    }

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuarios getUsuarios1() {
        return usuarios1;
    }

    public void setUsuarios1(Usuarios usuarios1) {
        this.usuarios1 = usuarios1;
    }

    public Roles getRoles1() {
        return roles1;
    }

    public void setRoles1(Roles roles1) {
        this.roles1 = roles1;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (perfilesPK != null ? perfilesPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Perfiles)) {
            return false;
        }
        Perfiles other = (Perfiles) object;
        if ((this.perfilesPK == null && other.perfilesPK != null) || (this.perfilesPK != null && !this.perfilesPK.equals(other.perfilesPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.opensoft.desktop.model.entities.Perfiles[ perfilesPK=" + perfilesPK + " ]";
    }
    
}
