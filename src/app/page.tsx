import { Button } from '@/components/ui/button';
import { Rocket, Zap } from 'lucide-react'
import Link from 'next/link';

export default function Home () {
    return (
        <div className="container mx-auto">
            <header className="flex flex-row justify-between p-4">
                <Link href="/" className="flex flex-row items-center gap-2">
                    <Zap className='inline-block mr-2' />

                    <span>Apex Pulse</span>
                </Link>

                <div className="self-end flex flex-row gap-4">
                    <Button variant="outline" size="sm">
                        <Link href="/sign-in">
                            Entrar
                        </Link>
                    </Button>

                    <Button size="sm">
                        <Link href="/sign-up">
                            Criar conta
                        </Link>
                    </Button>
                </div>
            </header>

            <section className="p-4 flex flex-col items-center text-center gap-6">
                <span>
                    Utilidade principal do Apex Pulse
                </span>

                <span>
                    Breve descrição do que é o Apex Pulse e seus benefícios para os usuários.
                </span>

                <div className="flex gap-4">
                    <Button>
                        <Link href="/sign-up">
                            Criar conta agora mesmo
                        </Link>
                    </Button>

                    <Button variant="outline">
                        <Link href="/#features">
                            Ver recursos
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="p-4 flex flex-col items-center text-center gap-6" id="features">
                <span>
                    Recursos
                </span>

                <span>
                    Destaque os principais recursos do Apex Pulse, como monitoramento em tempo real, alertas personalizados e integração com Salesforce.
                </span>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Rocket className="inline-block" />
                            </div>

                            <span>
                                Nome do recurso {i}
                            </span>

                            <span>
                                Descrição breve do recurso {i}.
                            </span>
                        </div>
                    ))}
                </div>

            </section>

            <section className="p-4 flex flex-col items-center text-center gap-6">
                <span>
                    Pronto para começar?
                </span>

                <span>
                    Crie sua conta e comece a monitorar os seus deploys Salesforce hoje mesmo.
                </span>

                <Button>
                    <Link href="/sign-up">
                        Começar agora
                    </Link>
                </Button>
            </section>

            <footer className="flex flex-row p-4">
                <div className="grow">
                    <Zap className='inline-block mr-2' />

                    <span>
                        Apex Pulse
                    </span>
                </div>

                <span>
                    2026 Apex Pulse. Todos os direitos reservados.
                </span>
            </footer>
        </div>
    );
}
