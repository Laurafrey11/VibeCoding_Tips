import { NextResponse } from 'next/server';

// API para obtener datos del mercado laboral
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo') || 'laboral';

  if (tipo === 'laboral') {
    return await buscarEmpleos();
  }

  return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
}

async function buscarEmpleos() {
  const empleos: any[] = [];

  // API de Remotive (gratuita)
  try {
    const response = await fetch(
      'https://remotive.com/api/remote-jobs?search=automation+process&limit=20',
      { next: { revalidate: 3600 } }
    );

    if (response.ok) {
      const data = await response.json();
      for (const job of data.jobs || []) {
        const location = (job.candidate_required_location || '').toLowerCase();
        if (
          location.includes('argentina') ||
          location.includes('latam') ||
          location.includes('latin america') ||
          location.includes('worldwide') ||
          location.includes('anywhere') ||
          location.includes('south america')
        ) {
          empleos.push({
            titulo: job.title || 'Sin título',
            empresa: job.company_name || 'Empresa no especificada',
            ubicacion: job.candidate_required_location || 'Remoto',
            url: job.url || '',
            fecha: job.publication_date?.slice(0, 10) || '',
            categoria: job.category || '',
            tipo: job.job_type || '',
            salario: job.salary || 'No especificado',
          });
        }
      }
    }
  } catch (error) {
    console.error('Error con Remotive API:', error);
  }

  // API de Arbeitnow (gratuita)
  try {
    const response = await fetch('https://www.arbeitnow.com/api/job-board-api', {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();
      for (const job of data.data || []) {
        const titleLower = (job.title || '').toLowerCase();
        if (
          (titleLower.includes('automation') ||
            titleLower.includes('process') ||
            titleLower.includes('rpa')) &&
          job.remote
        ) {
          empleos.push({
            titulo: job.title || 'Sin título',
            empresa: job.company_name || 'Empresa no especificada',
            ubicacion: 'Remoto',
            url: job.url || '',
            fecha: job.created_at?.slice(0, 10) || '',
            categoria: 'Automation',
            tipo: 'Full-time',
            salario: 'No especificado',
          });
        }
      }
    }
  } catch (error) {
    console.error('Error con Arbeitnow API:', error);
  }

  // Eliminar duplicados por URL
  const urlsVistas = new Set<string>();
  const empleosUnicos = empleos.filter((emp) => {
    if (urlsVistas.has(emp.url)) return false;
    urlsVistas.add(emp.url);
    return true;
  });

  return NextResponse.json({ empleos: empleosUnicos.slice(0, 20) });
}
