<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InquiryResource\Pages;
use App\Models\Inquiry;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class InquiryResource extends Resource
{
    protected static ?string $model = Inquiry::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';

    protected static string|\UnitEnum|null $navigationGroup = 'CRM';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationBadgeColor = 'danger';

    public static function getNavigationBadge(): ?string
    {
        $count = Inquiry::where('status', 'new')->count();
        return $count > 0 ? (string) $count : null;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Inquiry Details')
                ->columns(2)
                ->schema([
                    \Filament\Forms\Components\TextInput::make('name')
                        ->disabled(),
                    \Filament\Forms\Components\TextInput::make('email')
                        ->disabled(),
                    \Filament\Forms\Components\TextInput::make('organisation')
                        ->disabled(),
                    \Filament\Forms\Components\TextInput::make('inquiry_type')
                        ->label('Type')
                        ->disabled(),
                    Textarea::make('message')
                        ->columnSpanFull()
                        ->disabled()
                        ->rows(6),
                ]),

            Section::make('Follow-up')
                ->columns(2)
                ->schema([
                    Select::make('status')
                        ->options([
                            'new'      => 'New',
                            'read'     => 'Read',
                            'replied'  => 'Replied',
                            'archived' => 'Archived',
                        ])
                        ->required(),
                    \Filament\Forms\Components\DateTimePicker::make('replied_at')
                        ->label('Replied at'),
                    Textarea::make('notes')
                        ->columnSpanFull()
                        ->rows(3)
                        ->placeholder('Internal notes…'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),

                TextColumn::make('inquiry_type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'corporate' => 'warning',
                        'press'     => 'info',
                        default     => 'gray',
                    }),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new'      => 'danger',
                        'read'     => 'warning',
                        'replied'  => 'success',
                        'archived' => 'gray',
                        default    => 'gray',
                    }),

                TextColumn::make('message')
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->message),

                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'new'      => 'New',
                        'read'     => 'Read',
                        'replied'  => 'Replied',
                        'archived' => 'Archived',
                    ]),
                SelectFilter::make('inquiry_type')
                    ->label('Type')
                    ->options([
                        'individual' => 'Individual',
                        'corporate'  => 'Corporate',
                        'press'      => 'Press',
                    ]),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListInquiries::route('/'),
            'view'   => Pages\ViewInquiry::route('/{record}'),
            'edit'   => Pages\EditInquiry::route('/{record}/edit'),
        ];
    }
}
