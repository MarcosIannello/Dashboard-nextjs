
export interface WidgetProps {
  title: string,
  children?: React.ReactNode,

}

export const Widget = ({ title, children }: WidgetProps) => {
  return (
    <div className="bg-white rounded shadow-lg md:col-span-2 lg:col-span-1 cursor-pointer" >
      <div className="h-full py-8 px-6 space-y-6 rounded-xl ">
        <div>
          <h5 className="text-xl text-black text-center">{title}</h5>
          <div className="mt-2 flex flex-col justify-center items-center gap-4">
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Widget
