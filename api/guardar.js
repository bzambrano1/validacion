export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { ciudad, direccion, complementos, numero, archivo } = req.body;

  try {
    const respuesta = await fetch("https://api.airtable.com/v0/applsI1T6WPfXQzt5/tbl2qcoDEfd8uNp9F", {
      method: "POST",
      headers: {
        "Authorization": "Bearer patmT7YgoahKfC3ak.7bf73dd977d4938d12f247e35fb5b94e3d40cf78566b0f8b592951c6e4ab1649",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              ciudad: ciudad,
              direccion: direccion,
              complementos: complementos,
              numero: numero,
              archivo: archivo
            }
          }
        ]
      })
    });

    const data = await respuesta.json();
    console.log("RESPUESTA AIRTABLE:", data); // LOG IMPORTANTÍSIMO

    if (!respuesta.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
