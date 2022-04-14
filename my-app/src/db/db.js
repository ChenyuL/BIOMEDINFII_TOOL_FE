// db.js
import Dexie from 'dexie';


export const db = new Dexie('rareDiseasesDB');
db.version(1).stores({
    symptom: '++id, name',
    disease: '++id, name, *symptomIds',
    note: '++id',
});

const Disease = db.disease.defineClass({
    id: Number,
    symptomIds: [Number],
    description: String,
    ref: String,
    images: [String],
});

Disease.prototype.save = function () {
    return db.disease.put(this);
}

const Symptom = db.symptom.defineClass({
    id: Number,
    name: String,
    onset: String,
    frequency: String,
});

Symptom.prototype.save = function () {
    return db.symptom.put(this);
}

const Note = db.note.defineClass({
    id: Number,
    note: String,
});

Note.prototype.save = function () {
    return db.note.put(this);
}

const symptomsList = [
    {
        name: "Diarrhea",
        onset: "",
        frequency: "",
    },
    {
        name: "Fever",
        onset: "",
        frequency: "",
    },
    {
        name: "Fatigue",
        onset: "",
        frequency: "",
    },
    {
        name: "Abdominal pain and cramping",
        onset: "",
        frequency: "",
    },
]

const rareDiseasesInfo = [
    {
        name: 'Noonan Syndrome',
        symptomIds: [1, 2, 3, 4, 5],
        description: "Noonan syndrome is a genetic disorder that is typically evident at birth (congenital). The disorder is characterized by a wide spectrum of symptoms and physical features that vary greatly in range and severity. In many affected individuals, associated abnormalities include a distinctive facial appearance; a broad or webbed neck; a low posterior hairline; a typical chest deformity and short stature. Characteristic features of the head and facial (craniofacial) area may include widely set eyes (ocular hypertelorism); skin folds that may cover the eyes’ inner corners (epicanthal folds); drooping of the upper eyelids (ptosis); a small jaw (micrognathia); a depressed nasal root; a short nose with broad base; and low-set, posteriorly rotated ears (pinnae). Distinctive skeletal malformations are also typically present, such as abnormalities of the breastbone (sternum), curvature of the spine (kyphosis and/or scoliosis), and outward deviation of the elbows (cubitus valgus). Many infants with Noonan syndrome also have heart (cardiac) defects, such as obstruction of proper blood flow from the lower right chamber of the heart to the lungs (pulmonary valvular stenosis) and thickening of the ventricular heart muscle (hypertrophic cardiomyopathy). Additional abnormalities may include malformations of certain blood and lymph vessels, blood clotting and platelet deficiencies, learning difficulties or mild intellectual disability, failure of the testes to descend into the scrotum (cryptorchidism) by the first year of life in affected males, and/or other symptoms and findings. \n In the majority of cases Noonan syndrome is an autosomal dominant genetic disorder caused by abnormalities (mutations) in more than eight genes. The five most commonly involved genes are: PTPN11 (50%), SOS1 (10-13%), RAF1 (5%), RIT1 (5%), and KRAS (less than 5%). Fewer individuals have a mutation in NRAS, BRAF, MEK2, RRAS, RASA2, A2ML1, and SOS2. Noonan-like disorders are found in association with mutations in SHOC2 and CBL. Noonan syndrome caused by pathogenic variants in LZTR1 can be inherited in either an autosomal dominant or an autosomal recessive manner.",
        ref: "https://rarediseases.info.nih.gov/diseases/10955/noonan-syndrome",
        images: ["https://www.aafp.org/afp/2014/0101/afp20140101p37-f1.jpg", "https://www.aafp.org/afp/2014/0101/afp20140101p37-f2.jpg", "https://www.aafp.org/afp/2014/0101/afp20140101p37-f3.jpg", "https://www.aafp.org/afp/2014/0101/afp20140101p37-f4.jpg"],
    },
    {
        name: 'Waardenburg Syndrome',
        symptomIds: [2],
        description: "Waardenburg syndrome is a genetic disorder that may be evident at birth (congenital). The range and severity of associated symptoms and findings may vary greatly from case to case. However, primary features often include distinctive facial abnormalities; unusually diminished coloration (pigmentation) of the hair, the skin, and/or the iris of both eyes (irides); and/or congenital deafness. More specifically, some affected individuals may have an unusually wide nasal bridge due to sideways (lateral) displacement of the inner angles (canthi) of the eyes (dystopia canthorum). In addition, pigmentary abnormalities may include a white lock of hair growing above the forehead (white forelock); premature graying or whitening of the hair; differences in the coloration of the two irides or in different regions of the same iris (heterochromia irides); and/or patchy, abnormally light (depigmented) regions of skin (leukoderma). Some affected individuals may also have hearing impairment due to abnormalities of the inner ear (sensorineural deafness). \n Researchers have described different types of Waardenburg syndrome (WS), based upon associated symptoms and specific genetic findings. For example, Waardenburg syndrome type I (WS1) is characteristically associated with sideways displacement of the inner angles of the eyes (i.e., dystopia canthorum), yet type II (WS2) is not associated with this feature. In addition, WS1 and WS2 are known to be caused by alterations (mutations) of different genes. Another form, known as type III (WS3), has been described in which characteristic facial, eye (ocular), and hearing (auditory) abnormalities may be associated with distinctive malformations of the arms and hands (upper limbs). A fourth form, known as WS4 or Waardenburg-Hirschsprung disease, may be characterized by primary features of WS in association with Hirschsprung disease. The latter is a digestive (gastrointestinal) disorder in which there is absence of groups of specialized nerve cell bodies within a region of the smooth (involuntary) muscle wall of the large intestine. \n In most cases, Waardenburg syndrome is transmitted as an autosomal dominant trait. A number of different disease genes have been identified that may cause Waardenburg syndrome in certain individuals or families (kindreds).",
        ref: "https://rarediseases.info.nih.gov/diseases/5525/waardenburg-syndrome",
        images: ["https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13256-018-1704-1/MediaObjects/13256_2018_1704_Fig1_HTML.png?as=webp", "https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13256-018-1704-1/MediaObjects/13256_2018_1704_Fig2_HTML.png?as=webp", "https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13256-018-1704-1/MediaObjects/13256_2018_1704_Fig3_HTML.png?as=webp"],
    },
    {
        name: 'Cardiofaciocutaneous syndrome',
        symptomIds: [3],
        description: "Cardiofaciocutaneous (CFC) syndrome is one of the RASopathies and is a rare genetic disorder is typically characterized by unusually sparse, brittle, curly hair; relatively large head (relative macrocephaly); a prominent forehead and abnormal narrowing of the sides of the forehead (bi-temporal narrowing); intellectual disability; failure to thrive; heart defects that are present at birth (congenital) or acquired later; short stature and skin abnormalities. CFC syndrome is a dominant disorder often caused by de novo (new) mutations in one of four genes called BRAF, MAP2K1 (MEK1), MAP2K2 (MEK2), and KRAS. Some affected individuals do not have a mutation in one of these genes, suggesting that other genes are also associated with CFC syndrome.",
        ref: "https://rarediseases.info.nih.gov/diseases/9146/cardiofaciocutaneous-syndrome",
        images: ["https://medlineplus.gov/images/PX0002O4_PRESENTATION.jpeg"],
    },
    {
        name: 'Congenital Pulmonary Lymphangiectasia' ,
        symptomIds: [4],
        description: "Congenital pulmonary lymphangiectasia (CPL) is a rare developmental disorder that is present at birth (congenital). Affected infants have abnormally widened (dilated) lymphatic vessels within the lungs. The lymphatic system helps the immune system in protecting the body against infection and disease. It consists of a network of tubular channels (lymph vessels) that drain a thin watery fluid known as lymph from different areas of the body into the bloodstream. Lymph accumulates in the tiny spaces between tissue cells and contains proteins, fats, and certain white blood cells known as lymphocytes. \n Infants with CPL often develop severe, potentially life-threatening, respiratory distress shortly after birth. Affected infants may also develop cyanosis, a condition marked by abnormal bluish discoloration of the skin that occurs because of low levels of circulating oxygen in the blood. The exact cause of CPL is unknown. \n CPL can occur as a primary or secondary disorder. Primary pulmonary lymphangiectasia can occur as isolated congenital defect within the lungs or as part of a generalized form of lymphatic vessel malformation (lymphangiectasia) that affects the entire body, usually associated with generalized lymphedema. Secondary CPL occurs secondary to a variety of heart (cardiac) abnormalities, and/or lymphatic obstructive forms.",
        ref: "https://rarediseases.info.nih.gov/diseases/9900/congenital-pulmonary-lymphangiectasia",
        images: ["https://media.springernature.com/full/springer-static/image/art%3A10.1186%2F1750-1172-1-43/MediaObjects/13023_2006_Article_43_Fig2_HTML.jpg?as=webp", "https://media.springernature.com/full/springer-static/image/art%3A10.1186%2F1750-1172-1-43/MediaObjects/13023_2006_Article_43_Fig3_HTML.jpg?as=webp"],
    },
    {
        name: "Crohn's Disease",
        symptomIds: [5],
        description: "Crohn’s disease is a type of inflammatory bowel disease (IBD), the general name for conditions that cause inflammation in the gastrointestinal (GI) tract. Common signs and symptoms include abdominal pain and cramping, diarrhea, and weight loss. Other general symptoms include feeling tired, nausea and loss of appetite, fever, and anemia. Complications of Crohn’s disease may include intestinal blockage, fistulas, anal fissures, ulcers, malnutrition, and inflammation in other areas of the body. Crohn’s disease can occur in people of all age groups but is most often diagnosed in young adults.[91][5565] The exact cause is unknown, but is thought to be due from a combination of certain genetic variations, changes in the immune system, and the presence of bacteria in the digestive tract.[91][5565][5566]  Many of the major genes related to Crohn disease, including NOD2, ATG16L1, IL23R, and IRGM, are involved in immune system function. The disease is not inherited but it appears to run in some families because in about 15% of the cases the disease is present in more than one relative.[5566] \n Treatment is aimed at relieving symptoms and reducing inflammation, and may include diet and medication, but some people require surgery.[91][5565] Surgery often involves removal of the diseased segment of bowel (resection), the two ends of healthy bowel are then joined together (anastomosis). In about 30% of people who have surgery for Crohn’s disease symptoms may come back within three years and up to 60% will have recurrence within ten years.[10947]",
        ref: "https://rarediseases.info.nih.gov/diseases/10232/crohns-disease",
        images: ["https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/11/15/17/40/ds00104_-ds00598_-ds00705_-ds00736_-ds00797_-ds00824_-ds00825_-ds01195_-my00141_-my00312_im00235_d7_colonrectalthu_jpg.jpg", "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2014/09/25/10/21/mcdc7_crohns.jpg"]
    }
]



db.on("populate", function() {
    db.symptom.bulkPut(symptomsList);

    db.disease.bulkPut(rareDiseasesInfo);
});
db.open();