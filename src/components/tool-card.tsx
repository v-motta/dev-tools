import { ArrowRight } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface ToolCardProps {
  title: string
  description: string
  image: StaticImageData
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function ToolCard({
  title,
  description,
  image,
  href,
  icon: Icon,
}: ToolCardProps) {
  return (
    <Card>
      <CardHeader className="flex-1">
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative h-52 w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full">
            Open tool <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
