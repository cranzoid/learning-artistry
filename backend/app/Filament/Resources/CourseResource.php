<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseResource\Pages;
use App\Models\Category;
use App\Models\Course;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static string|\UnitEnum|null $navigationGroup = 'Catalogue';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([

            // ── 1. Basic Info ─────────────────────────────────────────────────
            Section::make('Basic Info')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->columnSpanFull()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (string $operation, $state, callable $set) {
                            if ($operation === 'create') {
                                $set('slug', Str::slug($state));
                            }
                        }),

                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(Course::class, 'slug', ignoreRecord: true)
                        ->helperText('URL-friendly identifier. Auto-generated from title.')
                        ->columnSpanFull(),

                    Select::make('category_id')
                        ->label('Category')
                        ->relationship('category', 'name')
                        ->searchable()
                        ->preload()
                        ->createOptionForm([
                            TextInput::make('name')->required(),
                            TextInput::make('slug')
                                ->required()
                                ->unique(Category::class, 'slug'),
                        ])
                        ->nullable(),

                    Select::make('level')
                        ->options([
                            'beginner'     => 'Beginner',
                            'intermediate' => 'Intermediate',
                            'advanced'     => 'Advanced',
                        ])
                        ->nullable(),
                ]),

            // ── 2. Descriptions ───────────────────────────────────────────────
            Section::make('Descriptions')
                ->schema([
                    Textarea::make('short_description')
                        ->label('Short Description')
                        ->helperText('Shown on course cards (max 300 chars)')
                        ->maxLength(300)
                        ->rows(3)
                        ->columnSpanFull(),

                    RichEditor::make('full_description')
                        ->label('Full Description')
                        ->toolbarButtons([
                            'bold', 'italic', 'underline', 'strike',
                            'bulletList', 'orderedList',
                            'h2', 'h3',
                            'link', 'blockquote',
                            'undo', 'redo',
                        ])
                        ->columnSpanFull(),
                ]),

            // ── 3. Pricing ────────────────────────────────────────────────────
            Section::make('Pricing')
                ->columns(3)
                ->schema([
                    Toggle::make('show_price')
                        ->label('Show Price Publicly')
                        ->default(true)
                        ->helperText('Turn this off to show "Enquire now" on the website while keeping the saved pricing for later.'),

                    TextInput::make('price')
                        ->numeric()
                        ->prefix('₹')
                        ->minValue(0)
                        ->placeholder('0.00'),

                    TextInput::make('discounted_price')
                        ->label('Discounted Price')
                        ->numeric()
                        ->prefix('₹')
                        ->minValue(0)
                        ->placeholder('0.00')
                        ->helperText('Leave blank if no discount.'),

                    Select::make('currency')
                        ->options([
                            'INR' => 'INR — Indian Rupee',
                            'USD' => 'USD — US Dollar',
                            'EUR' => 'EUR — Euro',
                        ])
                        ->default('INR')
                        ->required(),

                    TextInput::make('razorpay_link')
                        ->label('Razorpay Payment Link')
                        ->url()
                        ->maxLength(500)
                        ->placeholder('https://rzp.io/l/...')
                        ->columnSpanFull()
                        ->helperText('Paste the full Razorpay payment link for this course.'),
                ]),

            // ── 4. Media ──────────────────────────────────────────────────────
            Section::make('Media')
                ->columns(2)
                ->schema([
                    FileUpload::make('thumbnail')
                        ->label('Course Thumbnail')
                        ->image()
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->directory('courses/thumbnails')
                        ->visibility('public')
                        ->maxSize(2048)
                        ->helperText('Recommended: 800×450px, max 2MB'),

                    FileUpload::make('banner')
                        ->label('Course Banner')
                        ->image()
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->directory('courses/banners')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->helperText('Recommended: 1600×900px, max 4MB'),
                ]),

            // ── 5. Course Details ─────────────────────────────────────────────
            Section::make('Course Details')
                ->columns(2)
                ->schema([
                    TextInput::make('duration')
                        ->placeholder('e.g. 6 weeks / 20 hours')
                        ->maxLength(100),

                    Select::make('delivery_mode')
                        ->label('Delivery Mode')
                        ->options([
                            'online'  => 'Online',
                            'offline' => 'Offline (In-person)',
                            'hybrid'  => 'Hybrid',
                        ])
                        ->nullable(),

                    Textarea::make('certification_info')
                        ->label('Certification Info')
                        ->rows(3)
                        ->columnSpanFull()
                        ->placeholder('Describe the certificate awarded upon completion.'),

                    Textarea::make('target_audience')
                        ->label('Who Is This For?')
                        ->rows(3)
                        ->columnSpanFull()
                        ->placeholder('Describe who this course is best suited for.'),
                ]),

            // ── 6. Content Blocks ─────────────────────────────────────────────
            Section::make('Content Blocks')
                ->description('Add structured content to highlight value for prospective students.')
                ->schema([
                    Repeater::make('highlights')
                        ->label('Course Highlights')
                        ->schema([
                            TextInput::make('item')
                                ->label('Highlight')
                                ->required()
                                ->placeholder('e.g. Live mentor sessions'),
                        ])
                        ->addActionLabel('Add Highlight')
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['item'] ?? null)
                        ->columnSpanFull(),

                    Repeater::make('learning_outcomes')
                        ->label('Learning Outcomes')
                        ->schema([
                            TextInput::make('item')
                                ->label('Outcome')
                                ->required()
                                ->placeholder('e.g. Build full-stack applications'),
                        ])
                        ->addActionLabel('Add Outcome')
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['item'] ?? null)
                        ->columnSpanFull(),

                    Repeater::make('syllabus')
                        ->label('Syllabus Modules')
                        ->schema([
                            TextInput::make('module')
                                ->label('Module Title')
                                ->required()
                                ->placeholder('e.g. Module 1: Introduction'),

                            Textarea::make('description')
                                ->label('Module Description')
                                ->rows(2)
                                ->placeholder('What will be covered in this module?'),
                        ])
                        ->addActionLabel('Add Module')
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['module'] ?? null)
                        ->columnSpanFull(),

                    Repeater::make('faqs')
                        ->label('FAQs')
                        ->schema([
                            TextInput::make('question')
                                ->required()
                                ->placeholder('e.g. Is there a refund policy?'),

                            Textarea::make('answer')
                                ->required()
                                ->rows(2)
                                ->placeholder('Yes, we offer a 7-day refund...'),
                        ])
                        ->addActionLabel('Add FAQ')
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['question'] ?? null)
                        ->columnSpanFull(),
                ]),

            // ── 7. SEO ────────────────────────────────────────────────────────
            Section::make('SEO')
                ->columns(1)
                ->collapsed()
                ->schema([
                    TextInput::make('meta_title')
                        ->label('Meta Title')
                        ->maxLength(60)
                        ->helperText('Recommended: 50–60 characters. Leave blank to use the course title.'),

                    Textarea::make('meta_description')
                        ->label('Meta Description')
                        ->rows(2)
                        ->maxLength(160)
                        ->helperText('Recommended: 150–160 characters.'),
                ]),

            // ── 8. Publishing ─────────────────────────────────────────────────
            Section::make('Publishing')
                ->columns(2)
                ->schema([
                    Select::make('status')
                        ->options([
                            'draft'     => 'Draft',
                            'published' => 'Published',
                            'archived'  => 'Archived',
                        ])
                        ->default('draft')
                        ->required()
                        ->helperText('Only "Published" courses appear in the API.'),

                    Toggle::make('featured')
                        ->label('Featured Course')
                        ->helperText('Pin this course to featured listings.')
                        ->default(false),
                ]),

        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->square()
                    ->size(48),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->sortable(),

                TextColumn::make('price')
                    ->money('INR')
                    ->sortable(),

                IconColumn::make('show_price')
                    ->label('Public Price')
                    ->boolean()
                    ->trueIcon('heroicon-o-eye')
                    ->falseIcon('heroicon-o-chat-bubble-left-right'),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft'     => 'warning',
                        'archived'  => 'danger',
                        default     => 'gray',
                    }),

                IconColumn::make('featured')
                    ->boolean()
                    ->label('Featured'),

                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->since()
                    ->sortable(),
            ])
            ->defaultSort('updated_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft'     => 'Draft',
                        'published' => 'Published',
                        'archived'  => 'Archived',
                    ]),

                SelectFilter::make('category_id')
                    ->label('Category')
                    ->relationship('category', 'name'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit'   => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
