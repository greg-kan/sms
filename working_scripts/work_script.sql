INSERT INTO public.agsk_document_type ( code, name )
SELECT  doc_type, type_name
FROM (
    select doc_type, type_name from public.doc_type_source
    order by index
) t2;


INSERT INTO public.agsk_document (code, complex, doc_code, name_rus, page_count, year)
select doc_code, is_complex, doc_code, doc_name, page_count1, year
from (
     select * from public.agsk_source order by index
         ) t;

