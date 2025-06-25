const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// 🚚 Função para notificar cliente e enviar e-mail após finalização de pedido
exports.onPedidoFinalizado = functions.https.onRequest(async (req, res) => {
    const { clienteEmail, motoristaEmail, pedidoId, detalhes } = req.body;

    try {
        // 🔔 Notificação push via FCM
        const payload = {
            notification: {
                title: 'Entrega finalizada!',
                body: 'Avalie seu pedido no app.',
            },
            topic: `cliente-${clienteEmail}`
        };
        await admin.messaging().send(payload);

        // 📧 Envio de e-mail com resumo da entrega
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seu-email@gmail.com',
                pass: 'sua-senha-ou-app-password'
            }
        });

        const mailOptions = {
            from: 'LogiTrack <seu-email@gmail.com>',
            to: [clienteEmail, motoristaEmail],
            subject: `Resumo da entrega - Pedido #${pedidoId}`,
            html: `<p>Detalhes do pedido:</p><pre>${JSON.stringify(detalhes, null, 2)}</pre>
                   <p><a href="https://seu-app-link.com">Clique aqui para fazer outro pedido</a></p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send("Notificação e e-mail enviados com sucesso.");
    } catch (error) {
        console.error("Erro no processamento:", error);
        res.status(500).send("Erro ao processar evento.");
    }
});
