import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { STATE_CHOICES } from '@/utils/states'

export const metadata: Metadata = {
  title: 'Gerador de pessoa',
  description:
    'Gere uma pessoa fictícia com nome, CPF, RG, data de nascimento, filiação, contato e endereço real para testes.',
  keywords: [
    'gerador de pessoa',
    'gerador de pessoa fictícia',
    'gerador de dados pessoais',
    'gerador de nome',
    'gerador de pessoas para teste',
  ],
}

const PERSON_FIELDS = [
  { key: 'name', label: 'Nome' },
  { key: 'sex', label: 'Sexo' },
  { key: 'cpf', label: 'CPF' },
  { key: 'rg', label: 'RG' },
  { key: 'birthdate', label: 'Data de nascimento' },
  { key: 'age', label: 'Idade' },
  { key: 'motherName', label: 'Mãe' },
  { key: 'fatherName', label: 'Pai' },
  { key: 'email', label: 'E-mail' },
  { key: 'password', label: 'Senha' },
  { key: 'mobilePhone', label: 'Celular' },
  { key: 'landlinePhone', label: 'Telefone fixo' },
  { key: 'cep', label: 'CEP' },
  { key: 'street', label: 'Logradouro' },
  { key: 'number', label: 'Número' },
  { key: 'neighborhood', label: 'Bairro' },
  { key: 'city', label: 'Cidade' },
  { key: 'state', label: 'Estado' },
  { key: 'height', label: 'Altura' },
  { key: 'weight', label: 'Peso' },
  { key: 'bloodType', label: 'Tipo sanguíneo' },
]

export default function PersonGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de pessoa</h1>

        <p className="text-muted-foreground text-balance">
          Uma pessoa fictícia é gerada ao abrir a página. Escolha o sexo e o
          estado, ou clique em "Gerar pessoa" para criar outra.
        </p>
      </div>

      <RecordGenerator
        buttonLabel="Gerar pessoa"
        endpoint="/api/generators/person"
        field="person"
        fields={PERSON_FIELDS}
        options={[
          {
            type: 'toggle',
            name: 'sex',
            label: 'Sexo',
            defaultValue: ANY,
            choices: [
              { value: ANY, label: 'Qualquer' },
              { value: 'female', label: 'Feminino' },
              { value: 'male', label: 'Masculino' },
            ],
          },
          {
            type: 'select',
            name: 'state',
            label: 'Estado',
            defaultValue: ANY,
            choices: [
              { value: ANY, label: 'Qualquer estado' },
              ...STATE_CHOICES,
            ],
          },
        ]}
      />

      <HowItWorks
        items={[
          'A pessoa é gerada no servidor e não fica armazenada em lugar nenhum.',
          'O CPF e o RG são válidos. O RG segue a regra de São Paulo.',
          'O endereço é real: o CEP existe e corresponde à rua, ao bairro e à cidade. Os telefones usam o DDD da cidade.',
          'Como no Brasil, o nome leva um sobrenome da mãe e depois um do pai.',
          'O e-mail usa domínios reservados para testes (example.com), então nenhuma mensagem chega a alguém de verdade.',
          'Os dados servem apenas para testes e não pertencem a nenhuma pessoa real.',
        ]}
      />

      <ApiUsage
        name="gerador de pessoa"
        method="GET"
        path="/api/generators/person"
        query={{ sex: 'female', state: 'BA' }}
        parameters={[
          {
            name: 'sex',
            description:
              'Opcional. "female" ou "male". Sem ele, o sexo é sorteado.',
          },
          {
            name: 'state',
            description:
              'Opcional. A sigla do estado, como "SP". Sem ela, o estado é sorteado.',
          },
        ]}
        response={{
          person: {
            name: 'Valentina Melo Costa',
            sex: 'Feminino',
            cpf: '161.429.616-26',
            rg: '39.541.250-X',
            birthdate: '15/02/1992',
            age: 34,
            motherName: 'Yasmin Saraiva Melo',
            fatherName: 'Frederico Souza Costa',
            email: 'valentina.costa73@example.net',
            password: 'zmwbsy-abdmnZ-3femhv',
            mobilePhone: '(71) 96600-2238',
            landlinePhone: '(71) 3985-1876',
            cep: '40070-260',
            street: 'Avenida Doze',
            number: '1223',
            neighborhood: 'Barris',
            city: 'Salvador',
            state: 'BA',
            height: '1,68 m',
            weight: '72 kg',
            bloodType: 'A+',
          },
        }}
      />
    </div>
  )
}
