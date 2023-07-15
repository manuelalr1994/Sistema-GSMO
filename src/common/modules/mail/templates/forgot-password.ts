export const forgotPasswordTemplate = async (url: string) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <style type="text/css">
            @media only screen and (min-device-width: 601px) {
                .content {
                    width: 600px !important;
                }
            }
    
            @-ms-viewport {
                width: device-width;
            }
    
            /* Column Drop Layout Pattern CSS */
            @media only screen and (max-width: 450px) {
                td[class="col"] {
                    display: block;
                    width: 100%;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    float: left;
                    text-align: left !important;
                    padding-bottom: 20px;
                }
            }
    
            * {
                margin-top: 0px;
                margin-bottom: 0px;
                padding: 0px;
                border: none;
                outline: none;
                list-style: none;
                -webkit-text-size-adjust: none;
            }
    
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                -webkit-text-size-adjust: 100% !important;
                -ms-text-size-adjust: 100% !important;
                -webkit-font-smoothing: antialiased !important;
            }
    
            img {
                border: 0 !important;
                display: block !important;
                outline: none !important;
            }
    
            table {
                border-collapse: collapse;
            }
    
            td {
                border-collapse: collapse;
            }
           
        </style>
    
    
    </head>
    
    <body>
    
        <div bgcolor="#f0f0f0" lang="es-419" dir="ltr" style="
      margin: 0;
      padding: 0;
      min-width: 100%;
      ">
            <table class="content" role="presentation" align="center" cellpadding="0" cellspacing="0" border="0"
                bgcolor="#f0f0f0" width="100%" style="
          font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 1em;
          line-height: 1.5;
          max-width: 700px;
          padding: 0 20px 0 20px;
          ">
                
                <tr>
                    <td class="main" bgcolor="#ffffff" style="
                    border: 10px solid #f0f0f0;
                    border-top: 15px solid #f0f0f0;
                    border-bottom: 20px solid #f0f0f0;
            padding: 15px 20px 30px 20px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.25);
            ">
                        <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td>
                                    <h1 style="color: rgba(0,0,0,.75);">
                                        Reestablecer contraseña
                                    </h1>
                                    <b style="color: rgba(0,0,0,.75);">
                                        Ha recibido este correo porque solicitó restablecer su contraseña para su cuenta de
                                        usuario en Sistema GSMO.
                                        <br /><br />
                                        Si usted no solicitó este cambio, puede ignorar este correo. Aún no hemos hecho
                                        modificaciones a su contraseña.
                                        <br /><br />
                                    </b>
    
                                    <p>
    
                                        <a href=${url}
                                            style="
            text-decoration: none;
            color: #fff;
            background-color: #D23328;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            display: inline-block;
            font-weight: 500;
            font-size: large;
            line-height: 1.125rem;
    
            border-top: 12px solid #D23328;
            border-bottom: 12px solid #D23328;
            border-right: 30px solid #D23328;
            border-left: 30px solid #D23328;
        " onMouseOver="this.style.color='#fff'; this.style.backgroundColor='#921108'; this.style.borderColor='#921108';"
                                            onMouseOut="this.style.color='#fff'; this.style.backgroundColor='#D23328'; this.style.borderColor='#D23328';">
    
                                            <font color="#ffffff">Restablecer mi contraseña</font>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>   
                </tr>
            </table>
        </div>
    </body>
    
    </html>
`;
}