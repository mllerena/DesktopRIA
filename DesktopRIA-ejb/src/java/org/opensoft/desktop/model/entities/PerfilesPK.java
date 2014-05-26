/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.model.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author MLLERENA
 */
@Embeddable
public class PerfilesPK implements Serializable {
    @Basic(optional = false)
    @Column(name = "CODIGO")
    private long codigo;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ROLES")
    private long roles;
    @Basic(optional = false)
    @NotNull
    @Column(name = "USUARIOS")
    private long usuarios;

    public PerfilesPK() {
    }

    public PerfilesPK(long codigo, long roles, long usuarios) {
        this.codigo = codigo;
        this.roles = roles;
        this.usuarios = usuarios;
    }

    public long getCodigo() {
        return codigo;
    }

    public void setCodigo(long codigo) {
        this.codigo = codigo;
    }

    public long getRoles() {
        return roles;
    }

    public void setRoles(long roles) {
        this.roles = roles;
    }

    public long getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(long usuarios) {
        this.usuarios = usuarios;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) codigo;
        hash += (int) roles;
        hash += (int) usuarios;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PerfilesPK)) {
            return false;
        }
        PerfilesPK other = (PerfilesPK) object;
        if (this.codigo != other.codigo) {
            return false;
        }
        if (this.roles != other.roles) {
            return false;
        }
        if (this.usuarios != other.usuarios) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.opensoft.desktop.model.entities.PerfilesPK[ codigo=" + codigo + ", roles=" + roles + ", usuarios=" + usuarios + " ]";
    }
    
}
