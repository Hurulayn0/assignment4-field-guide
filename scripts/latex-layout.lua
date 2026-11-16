-- Name: Huriye Kayadelen; Student number: 2200005795
function Table(tbl)
  if #tbl.colspecs == 4 then
    tbl.colspecs = {
      {pandoc.AlignLeft, 0.16}, {pandoc.AlignLeft, 0.22},
      {pandoc.AlignLeft, 0.22}, {pandoc.AlignLeft, 0.40}
    }
  end
  return tbl
end
-- Inline code needs legal break points too, especially in narrow table cells.
function Code(code)
  if not FORMAT:match('latex') then return code end
  local escapes = {
    ['\\']='\\textbackslash{}', ['{']='\\{', ['}']='\\}',
    ['#']='\\#', ['$']='\\$', ['%']='\\%', ['&']='\\&',
    ['_']='\\_', ['~']='\\textasciitilde{}', ['^']='\\textasciicircum{}',
    ['<']='\\textless{}', ['>']='\\textgreater{}'
  }
  local parts = {}
  for c in code.text:gmatch('.') do
    parts[#parts+1] = escapes[c] or c
    if c:match('[_/.,:;=<>|%-]') then parts[#parts+1] = '\\allowbreak{}' end
  end
  return pandoc.RawInline('latex', '\\texttt{' .. table.concat(parts) .. '}')
end
