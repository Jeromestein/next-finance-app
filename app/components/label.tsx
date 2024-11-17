export default function Label(props: any) {
  return <label {...props} className={`text-gray-700 dark:text-gray-300 ${props.className}`}></label>
}