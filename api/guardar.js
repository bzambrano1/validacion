export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { ciudad, direccion, complementos, numero, archivo } = req.body;

  try {
    const respuesta = await fetch(
      "https://api.airtable.com/v0/applsI1T6WPfXQzt5/tbl2qcoDEfd8uNp9F", 
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                ciudad,
                direccion,
                complementos,
                numero,
                archivo
              }
            }
          ]
        })
      }
    );

    const data = await respuesta.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
}
