/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.view.exceptions;

/**
 *
 * @author MLLERENA
 */
public class NotFoundException extends Exception{
    
    private String message;

    public NotFoundException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage(){
        return this.message;
    }
    
    
}
