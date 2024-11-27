import { forwardRef, InputHTMLAttributes } from "react"

export default forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  const styles = {
    'checkbox': 'rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm disabled:opacity-75',
    'default': 'w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-75'
  } as { [key: string]: string }
  return <input ref={ref} {...props} className={styles[props.type as string] ?? styles['default']} />
})