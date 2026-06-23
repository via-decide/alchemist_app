const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'samples');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Generate PDF Sample
function buildPDF() {
  const doc = new jsPDF();
  let y = 20;

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("VIA.STACK // Chemical Kinetics Study Notes", 105, y, { align: "center" });
  doc.setFontSize(10);
  doc.text("SAMPLE PREVIEW", 105, y + 5, { align: "center" });
  doc.line(15, y + 8, 195, y + 8);
  y += 20;

  const topics = [
    {
      id: "A_0001",
      title: "Catalysis & Activation Energy",
      logic: "A catalyst lowers the activation energy by providing an alternative reaction pathway with a lower energy barrier. Enthalpy is a state function that depends only on the energy of initial and final states, so Delta H remains unchanged. Therefore, catalysts increase the reaction rate without affecting the net thermodynamic energy change."
    },
    {
      id: "A_0006",
      title: "Second-Order Kinetics",
      logic: "The units of the rate constant are derived from the rate law where Rate = k[A]^2. The rate has units of mol/(L s) while the concentration squared has units of mol2/L2. Dividing rate by concentration squared results in L/(mol s)."
    },
    {
      id: "A_0015",
      title: "Arrhenius Temperature Dependency",
      logic: "Activation energy is a characteristic property of a reaction reflecting the energy barrier of the transition state. While temperature increases the fraction of molecules with enough energy to cross the barrier, it does not alter the height of the barrier itself. Therefore, Ea is independent of temperature changes in the standard Arrhenius model."
    }
  ];

  topics.forEach((t) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`${t.id} // KINETICS`, 15, y);
    y += 5;

    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(t.title, 15, y);
    y += 6;

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize("LOGIC: " + t.logic, 180);
    doc.text(lines, 15, y);
    y += (lines.length * 5) + 8;

    doc.setDrawColor(220);
    doc.line(15, y - 4, 195, y - 4);
  });

  const pdfPath = path.join(outputDir, "chemical_kinetics_notes.pdf");
  const buffer = doc.output('arraybuffer');
  fs.writeFileSync(pdfPath, Buffer.from(buffer));
  console.log("Generated sample PDF at:", pdfPath);
}

// 2. Generate EPUB Sample (as a basic zip structure or text representation for mock)
function buildEPUB() {
  const epubPath = path.join(outputDir, "chemical_kinetics_notes.epub");
  const simplePackage = `
<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="pub-id" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:sample-kinetics-book</dc:identifier>
    <dc:title>Chemical Kinetics - Alchemist</dc:title>
    <dc:creator>Alchemist Study Engine</dc:creator>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="c0" href="c0.html" media-type="application/xhtml+xml"/>
  </manifest>
  <spine>
    <itemref idref="c0"/>
  </spine>
</package>
  `;
  fs.writeFileSync(epubPath, simplePackage);
  console.log("Generated sample EPUB at:", epubPath);
}

// 3. Generate Session JSON
function buildSessionJSON() {
  const jsonPath = path.join(outputDir, "chemical_kinetics_session.json");
  const session = {
    sessionId: "SES_SAMPLE",
    createdAt: new Date().toISOString(),
    results: [
      { id: "A_0001", res: "WIN", latency: 2800 },
      { id: "A_0006", res: "WIN", latency: 3100 },
      { id: "A_0015", res: "LOSS", latency: 4500 }
    ]
  };
  fs.writeFileSync(jsonPath, JSON.stringify(session, null, 2));
  console.log("Generated sample session JSON at:", jsonPath);
}

buildPDF();
buildEPUB();
buildSessionJSON();
