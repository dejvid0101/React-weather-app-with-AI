export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
import Navbar from './components/navbar'

//retrieve list of cities (city objects) for autocomplete inside navbar
async function getCities() {
  const res = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json',
    { cache: 'no-store' });
  //add error handling

  const data = await res.json();
  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cities = await getCities();

  //list of cities passed to navbar
  return (
    <html lang="en">

      <body className='bg-violet-50'>
        <Navbar CitiesObj={cities}></Navbar>
        {children}
        <footer className='content h-8 text-center bg-indigo-600 text-white mt-6'>
          <p>© 2023 davidk</p>
        </footer>
      </body>
    </html>
  )
}
