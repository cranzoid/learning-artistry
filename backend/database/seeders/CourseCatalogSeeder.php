<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseCatalogSeeder extends Seeder
{
    private const CATEGORY_DEFINITIONS = [
        'cloud' => [
            'name' => 'Cloud & Infrastructure',
            'description' => 'Cloud platforms, infrastructure operations, DevOps, containerisation, and enterprise security.',
        ],
        'data' => [
            'name' => 'Data, Analytics & AI',
            'description' => 'Data engineering, analytics, visualisation, machine learning, and applied AI.',
        ],
        'dev' => [
            'name' => 'Software Development & Automation',
            'description' => 'Developer tooling, automation engineering, testing, and intelligent workflow delivery.',
        ],
        'marketing' => [
            'name' => 'Digital Marketing & Growth',
            'description' => 'Digital growth strategy, campaign execution, and customer acquisition planning.',
        ],
        'pm' => [
            'name' => 'Project Management & Agile',
            'description' => 'Project, programme, agile, scrum, and scaled delivery leadership tracks.',
        ],
        'quality' => [
            'name' => 'Quality Management & Process Excellence',
            'description' => 'Lean, Six Sigma, and operational excellence programs for measurable business improvement.',
        ],
    ];

    private const COURSES = [
        ['title' => 'VMware vSphere: Install, Configure, Manage [V8]', 'price' => 1999, 'category' => 'cloud', 'focus' => 'vSphere deployment, cluster configuration, and virtual infrastructure operations', 'level' => 'Advanced', 'duration' => '30 hours'],
        ['title' => 'AWS Solution Architect Training and Certification', 'price' => 799, 'category' => 'cloud', 'focus' => 'AWS architecture design, resilient workloads, and cost-aware deployment patterns', 'level' => 'Advanced', 'duration' => '32 hours'],
        ['title' => 'AWS SysOps Administrator Associate training and Certification', 'price' => 799, 'category' => 'cloud', 'focus' => 'AWS administration, monitoring, logging, backup, and operational automation', 'level' => 'Advanced', 'duration' => '28 hours'],
        ['title' => 'Microsoft Azure Training and Certification', 'price' => 449, 'category' => 'cloud', 'focus' => 'Azure services, identity, compute, storage, and governance foundations', 'level' => 'Intermediate', 'duration' => '24 hours'],
        ['title' => 'IoT Certification Training', 'price' => 220, 'category' => 'dev', 'focus' => 'IoT architectures, device communication, sensor data, and edge integration workflows', 'level' => 'Intermediate', 'duration' => '20 hours'],
        ['title' => 'Big Data & Hadoop Training', 'price' => 499, 'category' => 'data', 'focus' => 'distributed data processing, Hadoop ecosystem tools, and scalable pipeline design', 'level' => 'Intermediate', 'duration' => '24 hours'],
        ['title' => 'PMI- RMP', 'price' => 399, 'category' => 'pm', 'focus' => 'project risk identification, quantitative analysis, response planning, and risk governance', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'PMP Certification Training - PMBOK 7', 'price' => 1099, 'category' => 'pm', 'focus' => 'project leadership, delivery principles, domain-based planning, and exam readiness', 'level' => 'Executive', 'duration' => '35 hours'],
        ['title' => 'PMI - Agile Certified Practitioner (ACP)', 'price' => 389, 'category' => 'pm', 'focus' => 'agile principles, delivery cadences, adaptive planning, and stakeholder collaboration', 'level' => 'Intermediate', 'duration' => '21 hours'],
        ['title' => 'PMI- Certified Associate in Project Management (CAPM)', 'price' => null, 'category' => 'pm', 'focus' => 'core project management terminology, lifecycle concepts, and foundational delivery practices', 'level' => 'Beginner', 'duration' => '20 hours'],
        ['title' => 'MSP Practitioner', 'price' => 200, 'category' => 'pm', 'focus' => 'programme governance, benefits realisation, and coordinated business change delivery', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'Digital Marketing', 'price' => 250, 'category' => 'marketing', 'focus' => 'digital channels, campaign planning, audience targeting, and performance fundamentals', 'level' => 'Beginner', 'duration' => '18 hours'],
        ['title' => 'Digital Marketing Expert', 'price' => 500, 'category' => 'marketing', 'focus' => 'multi-channel growth strategy, analytics, and end-to-end performance marketing execution', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'Marketing Strategy Professional', 'price' => 250, 'category' => 'marketing', 'focus' => 'market positioning, portfolio planning, and strategic demand generation decisions', 'level' => 'Intermediate', 'duration' => '20 hours'],
        ['title' => 'Marketing Strategy Specialist', 'price' => 350, 'category' => 'marketing', 'focus' => 'segmentation, channel mix selection, messaging, and campaign planning routines', 'level' => 'Intermediate', 'duration' => '18 hours'],
        ['title' => 'Six Sigma Green Belt Course', 'price' => 499, 'category' => 'quality', 'focus' => 'DMAIC problem-solving, process measurement, and quality improvement execution', 'level' => 'Intermediate', 'duration' => '24 hours'],
        ['title' => 'Six Sigma Black Belt Course', 'price' => 699, 'category' => 'quality', 'focus' => 'advanced Six Sigma leadership, statistical analysis, and enterprise improvement delivery', 'level' => 'Advanced', 'duration' => '30 hours'],
        ['title' => 'Lean Six Sigma Green Belt Course', 'price' => 320, 'category' => 'quality', 'focus' => 'lean waste reduction, process mapping, and improvement project execution', 'level' => 'Intermediate', 'duration' => '24 hours'],
        ['title' => 'Lean Six Sigma Black Belt', 'price' => 399, 'category' => 'quality', 'focus' => 'lean systems thinking, statistical control, and transformation program ownership', 'level' => 'Advanced', 'duration' => '30 hours'],
        ['title' => 'Scrum Developer Certification', 'price' => 350, 'category' => 'pm', 'focus' => 'scrum engineering practices, sprint delivery, and collaborative product development', 'level' => 'Intermediate', 'duration' => '16 hours'],
        ['title' => 'Scrum Master Certification', 'price' => 400, 'category' => 'pm', 'focus' => 'scrum facilitation, team coaching, impediment removal, and cadence management', 'level' => 'Intermediate', 'duration' => '16 hours'],
        ['title' => 'Scrum Agile Master Certification', 'price' => 450, 'category' => 'pm', 'focus' => 'agile leadership, team flow, iterative planning, and adaptive delivery management', 'level' => 'Intermediate', 'duration' => '18 hours'],
        ['title' => 'Scrum Product Owner Certification', 'price' => 500, 'category' => 'pm', 'focus' => 'backlog strategy, prioritisation, customer value definition, and product discovery', 'level' => 'Intermediate', 'duration' => '16 hours'],
        ['title' => 'Expert Scrum Master Certified (ESMC)', 'price' => 800, 'category' => 'pm', 'focus' => 'advanced scrum coaching, scaling practices, and enterprise agile facilitation', 'level' => 'Advanced', 'duration' => '20 hours'],
        ['title' => 'Professional SCRUM Master', 'price' => 300, 'category' => 'pm', 'focus' => 'scrum mastery, servant leadership, and measurable sprint performance improvement', 'level' => 'Advanced', 'duration' => '18 hours'],
        ['title' => 'MySQL DBA', 'price' => 380, 'category' => 'dev', 'focus' => 'MySQL administration, optimisation, backup, security, and high-availability operations', 'level' => 'Intermediate', 'duration' => '22 hours'],
        ['title' => 'Selenium 3.0', 'price' => 390, 'category' => 'dev', 'focus' => 'browser automation, UI regression testing, and maintainable automation framework design', 'level' => 'Intermediate', 'duration' => '20 hours'],
        ['title' => 'Apache Spark And Scala Training', 'price' => 450, 'category' => 'data', 'focus' => 'Spark-based distributed processing, Scala programming, and pipeline orchestration', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'Python Training & Certification', 'price' => 580, 'category' => 'dev', 'focus' => 'Python programming, scripting, automation, and practical problem-solving workflows', 'level' => 'Beginner', 'duration' => '26 hours'],
        ['title' => 'Microsoft Power BI and Visualization', 'price' => 399, 'category' => 'data', 'focus' => 'Power BI dashboards, business storytelling, and report-driven decision support', 'level' => 'Intermediate', 'duration' => '18 hours'],
        ['title' => 'Leading SAFe 4.5', 'price' => 1530, 'category' => 'pm', 'focus' => 'scaled agile leadership, ART planning, lean portfolio thinking, and transformation alignment', 'level' => 'Executive', 'duration' => '16 hours'],
        ['title' => 'AI & Deep Learning', 'price' => 230, 'category' => 'data', 'focus' => 'machine learning workflows, neural networks, and applied deep learning problem solving', 'level' => 'Advanced', 'duration' => '28 hours'],
        ['title' => 'Certified Ethical Hacker (CEH)', 'price' => 449, 'category' => 'cloud', 'focus' => 'ethical hacking techniques, vulnerability assessment, and attack-path analysis', 'level' => 'Advanced', 'duration' => '30 hours'],
        ['title' => 'CISSP', 'price' => 550, 'category' => 'cloud', 'focus' => 'security architecture, governance, asset protection, and enterprise security domains', 'level' => 'Advanced', 'duration' => '35 hours'],
        ['title' => 'Certified Information Security Manager (CISM)', 'price' => 449, 'category' => 'cloud', 'focus' => 'information security governance, risk management, and incident leadership', 'level' => 'Advanced', 'duration' => '28 hours'],
        ['title' => 'Certified Information Systems Auditor', 'price' => 449, 'category' => 'cloud', 'focus' => 'audit planning, controls assurance, compliance assessment, and governance review', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'OpenStack Certification Training', 'price' => 250, 'category' => 'cloud', 'focus' => 'OpenStack services, private cloud operations, and infrastructure management practices', 'level' => 'Intermediate', 'duration' => '22 hours'],
        ['title' => 'Docker Training Certification', 'price' => 449, 'category' => 'cloud', 'focus' => 'container creation, image management, networking, and deployment packaging', 'level' => 'Intermediate', 'duration' => '16 hours'],
        ['title' => 'DevOps Certification Training', 'price' => 399, 'category' => 'cloud', 'focus' => 'CI/CD, automation pipelines, observability, and collaborative release engineering', 'level' => 'Advanced', 'duration' => '28 hours'],
        ['title' => 'Kubernetes', 'price' => 449, 'category' => 'cloud', 'focus' => 'container orchestration, cluster operations, workload scaling, and production readiness', 'level' => 'Advanced', 'duration' => '24 hours'],
        ['title' => 'Advanced Automation Anywhere RPA Professional Course', 'price' => 1100, 'category' => 'dev', 'focus' => 'Automation Anywhere bot design, governance, and enterprise-grade automation delivery', 'level' => 'Advanced', 'duration' => '30 hours'],
        ['title' => 'Advanced RPA Professional Course (Masters)', 'price' => 2000, 'category' => 'dev', 'focus' => 'cross-platform RPA architecture, intelligent automation strategy, and scalable bot operations', 'level' => 'Advanced', 'duration' => '36 hours'],
        ['title' => 'RPA using Blue Prism Training Course', 'price' => 449, 'category' => 'dev', 'focus' => 'Blue Prism process automation, object studio design, and bot lifecycle control', 'level' => 'Intermediate', 'duration' => '22 hours'],
        ['title' => 'RPA using UiPath Training Course', 'price' => 449, 'category' => 'dev', 'focus' => 'UiPath workflows, attended and unattended bots, and automation solution delivery', 'level' => 'Intermediate', 'duration' => '22 hours'],
        ['title' => 'PMI - PgMP', 'price' => 399, 'category' => 'pm', 'focus' => 'programme strategy, cross-project governance, benefits delivery, and executive reporting', 'level' => 'Executive', 'duration' => '30 hours'],
    ];

    private const FEATURED_TITLES = [
        'AWS Solution Architect Training and Certification',
        'DevOps Certification Training',
        'Kubernetes',
        'Microsoft Power BI and Visualization',
        'PMP Certification Training - PMBOK 7',
        'Python Training & Certification',
        'Scrum Master Certification',
        'VMware vSphere: Install, Configure, Manage [V8]',
    ];

    public function run(): void
    {
        $categories = collect(self::CATEGORY_DEFINITIONS)
            ->mapWithKeys(function (array $definition, string $slug) {
                $category = Category::query()->updateOrCreate(
                    ['slug' => $slug],
                    [
                        'name' => $definition['name'],
                        'description' => $definition['description'],
                        'is_active' => true,
                    ]
                );

                return [$slug => $category];
            });

        Category::query()
            ->whereNotIn('slug', array_keys(self::CATEGORY_DEFINITIONS))
            ->update(['is_active' => false]);

        $importedSlugs = [];

        foreach (self::COURSES as $course) {
            $slug = Str::slug($course['title']);
            $importedSlugs[] = $slug;

            $price = $course['price'] ?? 499;
            $category = $categories[$course['category']];

            Course::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'category_id' => $category->id,
                    'title' => $course['title'],
                    'slug' => $slug,
                    'short_description' => $this->shortDescription($course),
                    'full_description' => $this->fullDescription($course, $category->name),
                    'price' => $price,
                    'discounted_price' => $this->comparePrice($price),
                    'currency' => 'INR',
                    'show_price' => true,
                    'thumbnail' => null,
                    'banner' => null,
                    'level' => $course['level'],
                    'duration' => $course['duration'],
                    'delivery_mode' => 'Online',
                    'certification_info' => $this->certificationInfo($course),
                    'highlights' => $this->wrapItems($this->highlights($course)),
                    'learning_outcomes' => $this->wrapItems($this->learningOutcomes($course)),
                    'target_audience' => $this->targetAudience($course),
                    'syllabus' => $this->syllabus($course),
                    'faqs' => $this->faqs($course),
                    'razorpay_link' => null,
                    'featured' => in_array($course['title'], self::FEATURED_TITLES, true),
                    'status' => 'published',
                    'meta_title' => "{$course['title']} | The Learning Artistry",
                    'meta_description' => Str::limit($this->shortDescription($course), 155),
                ]
            );
        }

        Course::query()
            ->whereNotIn('slug', $importedSlugs)
            ->update([
                'featured' => false,
                'status' => 'archived',
            ]);
    }

    private function shortDescription(array $course): string
    {
        return Str::limit(
            "Build practical confidence in {$course['focus']} through guided sessions, applied exercises, and structured certification preparation tailored for {$course['level']} learners.",
            220
        );
    }

    private function fullDescription(array $course, string $categoryName): string
    {
        $title = $this->escape($course['title']);
        $focus = $this->escape($course['focus']);
        $category = $this->escape($categoryName);
        $level = $this->escape($course['level']);
        $duration = $this->escape($course['duration']);

        return <<<HTML
<p><strong>{$title}</strong> is a {$level}-level {$category} program built for professionals who want real, job-ready skill in {$focus}. Each cohort balances concept clarity with applied practice so learners can use the material immediately in delivery, operations, or consulting environments.</p>
<p>Across {$duration} of guided learning, participants work through scenarios, review frameworks, and instructor-led walkthroughs that reinforce both implementation confidence and certification readiness. The course is structured to help you translate the knowledge into repeatable execution at work, not just exam recall.</p>
HTML;
    }

    private function certificationInfo(array $course): string
    {
        return "Certificate of completion from The Learning Artistry, plus focused preparation guidance aligned to {$course['title']}.";
    }

    private function highlights(array $course): array
    {
        return [
            "Instructor-led walkthroughs focused on {$course['focus']}",
            'Structured study plan with recap notes and applied exercises',
            'Scenario-based discussions designed to connect concepts to production work',
            "Assessment support and certification-oriented revision for {$course['title']}",
        ];
    }

    private function learningOutcomes(array $course): array
    {
        return [
            "Explain the core principles behind {$course['focus']}",
            'Apply the course frameworks to realistic delivery and troubleshooting scenarios',
            'Use industry vocabulary, workflows, and decision criteria with confidence',
            "Prepare for the next certification or project milestone linked to {$course['title']}",
        ];
    }

    private function targetAudience(array $course): string
    {
        return match ($course['level']) {
            'Beginner' => 'Ideal for learners entering the domain, career switchers, and early-career professionals who want a structured foundation with practical examples.',
            'Executive' => 'Designed for delivery leads, programme owners, and senior decision-makers who need a concise but applied understanding they can use across teams.',
            'Advanced' => 'Best suited to experienced practitioners, leads, and consultants who want deeper implementation confidence and exam-focused reinforcement.',
            default => 'Built for working professionals who already understand the basics and want guided practice, stronger delivery habits, and clearer certification readiness.',
        };
    }

    private function syllabus(array $course): array
    {
        return [
            [
                'module' => 'Foundations and Terminology',
                'description' => "Establish the core concepts, key terms, and mental models behind {$course['focus']}.",
            ],
            [
                'module' => 'Tools, Workflow, and Setup',
                'description' => 'Review the platforms, artefacts, and operational patterns required to work confidently in real environments.',
            ],
            [
                'module' => 'Applied Practice',
                'description' => 'Work through guided examples, scenario drills, and instructor-led walkthroughs that mirror on-the-job situations.',
            ],
            [
                'module' => 'Governance, Optimisation, and Troubleshooting',
                'description' => 'Strengthen decision-making, quality, security, and performance habits needed for dependable execution.',
            ],
            [
                'module' => 'Exam Strategy and Action Plan',
                'description' => "Consolidate learning with revision support, mock-style prompts, and a next-step plan for {$course['title']}.",
            ],
        ];
    }

    private function faqs(array $course): array
    {
        return [
            [
                'question' => 'Is this course live or self-paced?',
                'answer' => 'The program is delivered online with instructor-led sessions and structured takeaways that support revision between classes.',
            ],
            [
                'question' => 'Do I need prior experience before joining?',
                'answer' => match ($course['level']) {
                    'Beginner' => 'No deep prior experience is required. Basic professional curiosity and willingness to practise are enough to get started.',
                    'Executive' => 'Some prior exposure to delivery, leadership, or programme contexts will help you get more value from the case-based discussions.',
                    'Advanced' => 'Yes. This track is best for learners who already understand the fundamentals and want to deepen implementation confidence.',
                    default => 'A working understanding of the basics is recommended so you can spend more time on practice and less on first-time orientation.',
                },
            ],
            [
                'question' => 'Does the course help with certification preparation?',
                'answer' => "Yes. {$course['title']} includes guided revision, exam-style framing, and clear next-step preparation support.",
            ],
        ];
    }

    private function wrapItems(array $items): array
    {
        return array_map(fn (string $item) => ['item' => $item], $items);
    }

    private function comparePrice(int|float $price): int
    {
        $uplift = match (true) {
            $price < 300 => 100,
            $price < 500 => 150,
            $price < 900 => 200,
            $price < 1500 => 300,
            default => 500,
        };

        return (int) (ceil(($price + $uplift) / 50) * 50);
    }

    private function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
}
