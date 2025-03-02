import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const mainUrl = process.env.RESEND_VERIFIED_URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, name, masterclassId, masterclass } = req.body;

    try {
        const response = await resend.emails.send({
            from: `"Coach Filippo Ferri" <masterclass@filippoferri.it>`,
            to: email,
            subject: `[ISCRIZIONE CONFERMATA] ${masterclass}`,
            html: `<!doctype html>
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Simple Transactional Email</title>
                <style media="all" type="text/css">
                /* -------------------------------------
                GLOBAL RESETS
            ------------------------------------- */
                
                body {
                    font-family: Helvetica, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 18px;
                    line-height: 1.3;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                
                table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                }
                
                table td {
                    font-family: Helvetica, sans-serif;
                    font-size: 18px;
                    vertical-align: top;
                }
                /* -------------------------------------
                BODY & CONTAINER
            ------------------------------------- */
                
                body {
                    background-color: #FFFFFF;
                    margin: 0;
                    padding: 0;
                }
                
                .body {
                    background-color: #FFFFFF;
                    width: 100%;
                }
                
                .container {
                    margin: 0 auto !important;
                    max-width: 600px;
                    padding: 0;
                    padding-top: 24px;
                    width: 600px;
                }
                
                .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 0;
                }
                /* -------------------------------------
                HEADER, FOOTER, MAIN
            ------------------------------------- */
                
                .main {
                    background: #FFFFFF;
                    width: 100%;
                }
                
                .wrapper {
                    box-sizing: border-box;
                    padding: 24px 16px;
                }
                
                .footer {
                    clear: both;
                    padding-top: 24px;
                    padding-bottom: 24px;
                    text-align: center;
                    width: 100%;
                }
                
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                    color: #000000;
                    font-size: 12px;
                    text-align: center;
                }
                /* -------------------------------------
                TYPOGRAPHY
            ------------------------------------- */
                
                p {
                    font-family: Helvetica, sans-serif;
                    font-size: 18px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                }
                
                a {
                    color: #0867ec;
                    text-decoration: underline;
                }
                /* -------------------------------------
                BUTTONS
            ------------------------------------- */
                
                .btn {
                    box-sizing: border-box;
                    min-width: 100% !important;
                    width: 100%;
                }
                
                .btn > tbody > tr > td {
                    padding-bottom: 16px;
                }
                
                .btn table {
                    width: auto;
                }
                
                .btn table td {
                    background-color: #ffffff;
                    border-radius: 4px;
                    text-align: center;
                }
                
                .btn a {
                    background-color: #ffffff;
                    border: solid 2px #89b1dd;
                    border-radius: 4px;
                    box-sizing: border-box;
                    color: #89b1dd;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 24px;
                    text-decoration: none;
                    text-transform: capitalize;
                }
                
                .btn-primary table td {
                    background-color: #89b1dd;
                }
                
                .btn-primary a {
                    background-color: #89b1dd;
                    border-color: #89b1dd;
                    color: #ffffff;
                }
                
                @media all {
                    .btn-primary table td:hover {
                        background-color: #ec0867 !important;
                    }
                    .btn-primary a:hover {
                        background-color: #ec0867 !important;
                        border-color: #ec0867 !important;
                    }
                }
                
                /* -------------------------------------
                OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
                
                .last {
                    margin-bottom: 0;
                }
                
                .first {
                    margin-top: 0;
                }
                
                .align-center {
                    text-align: center;
                }
                
                .align-right {
                    text-align: right;
                }
                
                .align-left {
                    text-align: left;
                }
                
                .text-link {
                    color: #89b1dd !important;
                    text-decoration: underline !important;
                }
                
                .clear {
                    clear: both;
                }
                
                .mt0 {
                    margin-top: 0;
                }
                
                .mb0 {
                    margin-bottom: 0;
                }

                .mt16 {
                    margin-top: 16px;
                }

                .b16 {
                    margin-bottom: 16px;
                }
                
                .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0;
                }

                .header {
                    background-color: #000000;
                    font-weight: bold;
                    color: white;
                    padding: 24px;
                }
                
                .powered-by a {
                    text-decoration: none;
                }
                
                /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
                
                @media only screen and (max-width: 640px) {
                .main p,
                .main td,
                .main span {
                    font-size: 18px !important;
                }
                .wrapper {
                    padding: 8px !important;
                }
                .content {
                    padding: 0 !important;
                }
                .container {
                    padding: 0 !important;
                    padding-top: 8px !important;
                    width: 100% !important;
                }
                .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                }
                .btn table {
                    max-width: 100% !important;
                    width: 100% !important;
                }
                .btn a {
                    font-size: 16px !important;
                    max-width: 100% !important;
                    width: 100% !important;
                }
                }
                /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
                
                @media all {
                    .ExternalClass {
                        width: 100%;
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
                    .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important;
                    }
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                }
                </style>
            </head>
            <body>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                    <div class="content">
                        <!-- START CENTERED WHITE CONTAINER -->
                        <span class="preheader">Complimenti per esserti registrato alla Masterclass "${masterclass}".</span>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">

                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper">
                            <p>Ciao ${name},</p>
                            <p>Complimenti per esserti registrato alla Masterclass "${masterclass}".</p>
                            <p class="mt16 mb16">Il link all'evento è questo: <a href="${mainUrl}/countdown?id=${masterclassId}">Masterclass</a></p>
                            <p>Ti invito ad accedere <b>qualche minuto prima dell’inizio</b> in modo da controllare che la connessione funzioni e che tutto sia corretto, così da non perdere neanche un secondo!</p>
                            <p>Procurati carta e penna per prendere appunti e segnarti le informazioni che ti possono essere più utili.</p
                            <p><b>La tua attenzione sarà essenziale.</b></p>
                            <p>Affronteremo moltissimi argomenti interessanti e specifici perché il mio obiettivo è quello di darti strumenti altamente professionali per ampliare le tue competenze e aiutarti a fare quel cambiamento che desideri.</p>
                            <p class="mt16 mb16">Questo il link per partecipare: <a href="${mainUrl}/countdown?id=${masterclassId}">Masterclass</a></p>
                            <p><b>Grazie per la tua registrazione, ti aspetto online.</b></p>
                            <p>A presto,<br />Filippo</p>
                            </td>
                        </tr>
                        <!-- END MAIN CONTENT AREA -->
                        </table>
                        <!-- START FOOTER -->
                        <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                            <td class="content-block">
                                <span class="apple-link">Filippo Ferri Coaching,</br>Corso Vittorio Emanuele II 198,</br>Torino 10138</br>ITALIA</span>
                            </td>
                            </tr>
                        </table>
                        </div>
                        <!-- END FOOTER -->
                        <!-- END CENTERED WHITE CONTAINER --></div>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                </table>
            </body>
            </html>`,
        });

        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
}