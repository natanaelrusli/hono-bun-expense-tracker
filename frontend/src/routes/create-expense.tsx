import { createFileRoute } from '@tanstack/react-router'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useForm } from '@tanstack/react-form'
import { Calendar } from '@/components/ui/calendar'
import BottomBarLayout from '@/layout/bottom-bar-layout'
import useCounterStore from '@/store/counterStore'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

type CreateExpenseData = {
  title?: string
  amount?: number
}

function BottomBar({ formId }: { formId: string }) {
  const counterStore = useCounterStore()

  return (
    <Button form={formId} onClick={counterStore.inc} className='size-full'>
      Create Expense {counterStore.count}
    </Button>
  )
}

function CreateExpense() {
  const formId = 'expense-form'

  const form = useForm<CreateExpenseData>({
    defaultValues: {
      amount: 0,
      title: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <BottomBarLayout bottomBar={<BottomBar formId={formId} />}>
      <div className='mx-auto w-full p-4'>
        <h2 className='my-3 text-xl font-bold'>Create Expense</h2>

        <form
          id={formId}
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='flex flex-col gap-3'
        >
          <form.Field
            name='title'
            children={field => (
              <div>
                <Label htmlFor='title'>Title</Label>
                <Input
                  type='text'
                  id='title'
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value || '')}
                  placeholder="What's the expense for"
                />
              </div>
            )}
          />

          <form.Field
            name='amount'
            validators={{
              onBlur: ({ value }) =>
                value && value < 13
                  ? 'You must be 13 to make an account'
                  : undefined,
            }}
            children={field => (
              <div>
                <Label htmlFor='amount'>Amount</Label>
                <Input
                  type='number'
                  id='amount'
                  name={field.name}
                  defaultValue={0}
                  onChange={e => {
                    field.handleChange(e.target.valueAsNumber)
                  }}
                  placeholder='The amount of the expense'
                />
              </div>
            )}
          />

          <div className='my-3 flex justify-center'>
            <Calendar />
          </div>
        </form>
      </div>
    </BottomBarLayout>
  )
}
