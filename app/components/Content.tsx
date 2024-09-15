import { ReactNode } from "react"

type ContentProps = {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <main className="p-16 mx-auto h-screen overflow-hidden max-w-6xl min-w-sm flex flex-row gap-3">
      <div className="p-6 bg-slate-900 rounded-xl shadow-lg h-full w-full overflow-auto scroller">
        <nav>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 min-w-fit">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              Acervo
            </li>
            <li>
              Central da comunidade
            </li>
            <li>
              Radio Mula
            </li>
          </ul>
          <marquee className="mt-3 text-orange-600">Este texto vai "rolar" da direita para esquerda</marquee>
        </nav>
        {children}
      </div>
      <div className="h-full flex flex-col gap-3">
        <aside className="bg-slate-900 rounded-xl shadow-lg p-6 h-1/2 min-w-44">
          Tópicos
        </aside>
        <aside className="bg-slate-900 rounded-xl shadow-lg p-6 h-1/2 min-w-44">
          Addons
        </aside>
      </div>
    </main>
  )
}