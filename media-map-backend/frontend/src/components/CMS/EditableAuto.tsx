import React from 'react';
import EditableText from './EditableText';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'li';

interface Props {
  /** Что рендерим. Не строка — отдаём как есть, редактор не вмешивается. */
  value: React.ReactNode;
  /** Пространство имён ключа: файл и выражение, откуда взят текст. */
  ns: string;
  className?: string;
  as?: Tag;
  multiline?: boolean;
}

/**
 * Обёртка для текста, у которого нет собственного ключа: элементы списков,
 * значения из массивов и объектов, объявленных внутри компонентов.
 *
 * Ключ считается от самого текста, а не от позиции в разметке. Иначе все
 * элементы одного .map() получили бы один ключ и правились скопом.
 *
 * Оборотная сторона: если исходную строку поменять в коде, правка к ней
 * больше не привяжется — она останется в базе под старым ключом.
 */
const hash = (input: string): string => {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
};

export const EditableAuto: React.FC<Props> = ({
  value,
  ns,
  className,
  as,
  multiline,
}) => {
  if (typeof value !== 'string' || !value.trim()) {
    return <>{value}</>;
  }

  return (
    <EditableText
      textKey={`auto.${ns}.${hash(value)}`}
      value={value}
      className={className}
      as={as}
      multiline={multiline}
    />
  );
};

export default EditableAuto;
