/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.opensoft.servlets;

import java.io.IOException; 
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author mllerena
 */
@WebServlet(name = "ServletTest", urlPatterns = {"/ServletTest"})
public class ServletTest extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession(false); 
        String operation = request.getParameter("operation");
        System.out.println("operation - " + operation);
        ObjectMapper o = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        if (operation != null && operation.equals("global")) {
            Boolean login = false;
            if(session!=null){
                session = request.getSession(false); 
                login = (Boolean) session.getAttribute("login");
            }
            map.put("success", true);
            map.put("login", login);
        }else if (operation != null && operation.equals("login")) {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            map.put("success", false);
            if (username != null && password != null) {
                if (username.equals("a") && password.equals("a")) {
                    map.put("success", true);
                    map.put("login", true);
                    session = request.getSession(true); 
                    if(session!=null) {
                        session.setAttribute("login", true);
                        session = request.getSession(false); 
                        Boolean login = (Boolean) session.getAttribute("login");
                        System.out.println("login ->>> "+login);
                    }
                } else {
                    //if(session!=null) session.invalidate();
                    map.put("success", false);
                    map.put("message", "Usuario y/o contraseña incorrectos");
                }
            }

        } else if (operation != null && operation.equals("logout")) {
            if(session!=null){
                session.invalidate();
            }
            map.put("success", true);
            map.put("login", false);
        }
        try {
            out.println(o.writeValueAsString(map));
        } finally {
            out.close();
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
