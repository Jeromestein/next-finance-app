import { variants, sizes } from "@/lib/variants"

export default function Button(props: any) {
  return (
    <button {...props} className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']} ${props.className}`}></button>
  )
}