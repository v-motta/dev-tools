import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const featuredTools = [
    {
      title: 'Gerador de CPF',
      description:
        'Facilite a geração de CPFs válidos com nosso gerador de CPF.',
      image: '/cpf.png',
      href: '/generators/cpf',
    },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold font-mono">Featured tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {featuredTools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <div className="bg-white dark:bg-zinc-800 hover:dark:bg-zinc-700/60 border border-zinc-500 px-5 py-4 space-y-4 rounded-lg shadow hover:border-zinc-300 transition">
              <Image
                src={tool.image}
                alt=""
                width={400}
                height={200}
                className="h-44 object-cover"
              />

              <div className="space-y-2">
                <h2 className="text-xl font-bold font-mono">Gerador de CPF</h2>
                <p className="text-zinc-400 text-balance">
                  Facilite a geração de CPFs válidos com nosso gerador de CPF.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
