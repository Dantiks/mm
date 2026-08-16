import React from 'react';

interface Props {
  /** CMS key this text is bound to. Edited in the admin panel at /admin/texts. */
  textKey: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

/**
 * Renders a CMS-backed string on the public site.
 *
 * The binding to `textKey` is what makes the text editable — editing itself
 * lives in the admin panel (/admin/texts), not here. The public site only
 * displays; it never turns into an editing surface for visitors.
 */
export const EditableText: React.FC<Props> = ({ value, className = '', as: Component = 'span' }) => (
  <Component className={className}>{value}</Component>
);

export default EditableText;
