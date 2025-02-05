import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const featuredTools = [
    {
      title: 'Gerador de CPF',
      description:
        'Facilite a geração de CPFs válidos com nosso gerador de CPF.',
      image: '/generate-cpf-2.png',
      href: '/generators/cpf',
    },
    {
      title: 'Validador de CPF',
      description: 'Verifique se um CPF é válido com nosso validador de CPF.',
      image: '/validate-cpf-2.png',
      href: '/validators/cpf',
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-mono">Featured tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {featuredTools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <div className="bg-white dark:bg-zinc-800 hover:dark:bg-zinc-700/60 border border-zinc-500 p-4 space-y-4 rounded-lg shadow hover:border-zinc-300 transition">
              <Image
                src={tool.image}
                alt=""
                width={1280}
                height={1024}
                className="h-40 object-cover rounded-md"
              />

              <div className="space-y-2">
                <h2 className="text-xl font-bold font-mono">{tool.title}</h2>
                <p className="text-zinc-400 text-balance">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
