with base as (
    select doc_code, CASE WHEN is_npa_main = 1 THEN 'is_npa_main' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_npa_derived = 1 THEN 'is_npa_derived' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_ntd_mandatory = 1 THEN 'is_ntd_mandatory' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_ntd_currentbase = 1 THEN 'is_ntd_currentbase' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_ntd_national = 1 THEN 'is_ntd_national' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_ntd_standard = 1 THEN 'is_ntd_standard' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_ntd_sectoral = 1 THEN 'is_ntd_sectoral' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_lc_preliminary = 1 THEN 'is_lc_preliminary' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_lc_design = 1 THEN 'is_lc_design' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_lc_building = 1 THEN 'is_lc_building' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_lc_maintenance = 1 THEN 'is_lc_maintenance' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_lc_elimination = 1 THEN 'is_lc_elimination' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_prom = 1 THEN 'is_obj_prom' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_hydro = 1 THEN 'is_obj_hydro' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_agro = 1 THEN 'is_obj_agro' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_living = 1 THEN 'is_obj_living' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_adm = 1 THEN 'is_obj_adm' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_social = 1 THEN 'is_obj_social' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_edu = 1 THEN 'is_obj_edu' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_health = 1 THEN 'is_obj_health' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_sport = 1 THEN 'is_obj_sport' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_culture = 1 THEN 'is_obj_culture' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_food = 1 THEN 'is_obj_food' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_trade = 1 THEN 'is_obj_trade' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_multi = 1 THEN 'is_obj_multi' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_obj_linear = 1 THEN 'is_obj_linear' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_a = 1 THEN 'is_81346_a' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_b = 1 THEN 'is_81346_b' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_c = 1 THEN 'is_81346_c' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_d = 1 THEN 'is_81346_d' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_e = 1 THEN 'is_81346_e' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_f = 1 THEN 'is_81346_f' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_g = 1 THEN 'is_81346_g' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_h = 1 THEN 'is_81346_h' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_j = 1 THEN 'is_81346_j' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_k = 1 THEN 'is_81346_k' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_l = 1 THEN 'is_81346_l' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_m = 1 THEN 'is_81346_m' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_n = 1 THEN 'is_81346_n' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_p = 1 THEN 'is_81346_p' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_q = 1 THEN 'is_81346_q' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_81346_s = 1 THEN 'is_81346_s' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_durability = 1 THEN 'is_1202_durability' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_fire = 1 THEN 'is_1202_fire' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_health = 1 THEN 'is_1202_health' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_maintance = 1 THEN 'is_1202_maintance' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_noise = 1 THEN 'is_1202_noise' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_1202_saving = 1 THEN 'is_1202_saving' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_designer = 1 THEN 'is_user_designer' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_cost = 1 THEN 'is_user_cost' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_builder = 1 THEN 'is_user_builder' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_expert = 1 THEN 'is_user_expert' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_supervision = 1 THEN 'is_user_supervision' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_customer = 1 THEN 'is_user_customer' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_urban = 1 THEN 'is_user_urban' ELSE null END class_id
    from public.agsk_source
    union
    select doc_code, CASE WHEN is_user_edu = 1 THEN 'is_user_edu' ELSE null END class_id
    from public.agsk_source
),
base1 as (
    select t3.id doc_id, t2.id cls_id, t3.doc_code
    from base t1
             join public.agsk_document_class t2 on t1.class_id = t2.name
             join public.agsk_document t3 on t1.doc_code = t3.doc_code
    order by t3.id
)

insert into public.agsk_document_document_class (document_id, class_id)
select doc_id, cls_id
from base1
order by doc_id, cls_id

select * from public.agsk_source
where doc_code = 'INST_2015'
--order by id
--select * from public.agsk_document_class
--select * from public.agsk_document_document_class

select * from public.agsk_document
where doc_code like '%p090000172%'
