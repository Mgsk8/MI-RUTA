import Navbar from "../components/Navbar";

export default function Inicio() {
    const navigation = [
        
    ];

    return (
        <div>
            <Navbar navigation={navigation} logo="/image/logoblanco.png" />
            <div class="bg-slate-900 min-h-screen w-full">
                <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left|-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle
                                cx="512"
                                cy="512"
                                r="512"
                                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                                fill-opacity="0.7"
                            />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stop-color="#f39c12" />
                                    <stop offset="1" stop-color="#E935C1" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div class="mx-auto max-w-center text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-center">
                            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Términos y Condiciones de Uso
                            </h2>
                            <p class="mt-6 text-lg leading-8 text-gray-300">
                                Al registrarte en nuestra plataforma, aceptas que la información
                                proporcionada es veraz y actualizada. La plataforma se dedica a
                                promover el turismo y facilitar la exploración de restaurantes,
                                parques de diversiones y otros lugares de interés. Al activar tu
                                ubicación, podrás recibir recomendaciones personalizadas de los
                                sitios más cercanos a ti. Es importante que uses esta
                                funcionalidad de manera responsable y respetes la privacidad y
                                la seguridad de otros usuarios. La plataforma se reserva el
                                derecho de modificar o cancelar cualquier parte de sus servicios
                                en función de las necesidades operativas o de las políticas de
                                uso. Al continuar utilizando nuestros servicios, aceptas cumplir
                                con estos términos y condiciones.
                            </p>
                            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                
                            
                            </div>
                        </div>
                        <div class="relative mt-16 h-80 lg:mt-8"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
