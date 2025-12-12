
import { Todo } from '@/models/Todo';
import './form-todo.css';

interface FormTodoProps {
  onChange(todo: Todo): void;
  todo: Todo;
  save(): void;
}

function FormTodo({
  onChange,
  todo,
  save
}: FormTodoProps) {

  const prioritys = ['baixa', 'media', 'alta'];

  return (
    <section className='container-form'>
      <div className='form-todo'>
        <form>
          <div className='input-form'>
            <label>Titulo</label>
            <input
              type='text'
              placeholder='titulo da tarefa'
              onChange={(e) => onChange({ ...todo, title: e.target.value })}
            />
          </div>
          <div className='input-form'>
            <label>Description</label>
            <textarea
              placeholder='Descrição da tarefa'
              onChange={(e) => onChange({ ...todo, description: e.target.value })}
            >

            </textarea>
          </div>
          <div className='input-form'>
            <label>Prioridade</label>
            <select
              onChange={(e) => onChange({ ...todo, priority: e.target.value })}
            >
              <option disabled selected>Selecione a prioridade</option>
              {prioritys.map((p, i) => (
                <option key={i}>{p}</option>
              ))}
            </select>
          </div>
          <div className='input-form'>
            <label>Tag</label>
            <input
              type='text'
              placeholder='ex: trabalho | estudos | pessoal'
              onChange={(e) => onChange({ ...todo, tag: e.target.value })}
            />
          </div>
          <div className='input-form'>
            <label>Data</label>
            <input
              type='date'
              placeholder='titulo da tarefa'
              onChange={(e) => onChange({ ...todo, date: e.target.value })}
            />
          </div>
        </form>
        <button
          onClick={save}
          className='btn-save'
        >
          Salvar !!!
        </button>
      </div>
    </section>
  );
}

export { FormTodo }

